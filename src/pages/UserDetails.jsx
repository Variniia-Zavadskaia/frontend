import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'
import { loadEntrys } from '../store/actions/entry.actions'
import { entryService } from '../services/entry'

export function UserDetails() {
    const { id } = useParams()
    const user = useSelector(storeState => storeState.userModule.watchedUser)
    const [userEntrys, setUserEntrys] = useState([])

    useEffect(() => {
        loadUser(id)
        loadUserEntrys()

        socketService.emit(SOCKET_EMIT_USER_WATCH, id)
        socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

        return () => {
            socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
        }
    }, [id])

    async function loadUserEntrys() {
        const entrys = await entryService.query({ byId: id })
        setUserEntrys(JSON.parse(JSON.stringify(entrys)))
    }

    function onUserUpdate(user) {
        showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
        store.dispatch({ type: 'SET_WATCHED_USER', user })
    }

    if (!user) return <></>

    return (
        <section className="user-details">
            <header className="user-header">
                <div>
                    
                </div>
                <img src={user.imgUrl} style={{ width: '150px' }} />
                <article className="user-info">
                    <div className="info-top">
                        <p>{user.fullname}</p>
                        <div className="use-buttons">
                            <button>Edit profile</button>
                            <button>View archive</button>
                            <button>Setting</button>
                        </div>
                    </div>
                    <div className="info-midle">
                        <p>{userEntrys.length} posts</p>
                        <p>{user.followers.length} followers</p>
                        <p>{user.following.length} following</p>
                    </div>
                </article>
            </header>
            <div className=""></div>
            <ul className="user-entrys">
                {userEntrys.map(entry => (
                    <li key={entry._id} className="square-image">
                        <img src={entry.imgUrl} />
                        {/* <EntryPreview entry={entry} onRemoveEntry={onRemoveEntry} onUpdateEntry={onUpdateEntry}/> */}
                    </li>
                ))}
            </ul>
        </section>
    )
}
