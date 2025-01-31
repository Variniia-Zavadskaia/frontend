import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { NavLink, Outlet } from 'react-router-dom'

import { loadUser, loadUserEntrys } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'
import { UserEntryList } from '../cmps/UserEntryList'
import { entrySvg } from '../cmps/Svgs'
import { AppFooter } from '../cmps/AppFooter'
import { follow } from '../store/actions/user.actions'

export function UserDetails() {
    const { id } = useParams()    
    const user = useSelector(storeState => storeState.userModule.watchedUser)
    const logedInUserId = useSelector(storeState => storeState.userModule.user._id)
    const entrysCount = useSelector(storeState => storeState.userModule.watchedUserEntrys.length)

    useEffect(() => {
        loadUser(id)
        loadUserEntrys(id)

        socketService.emit(SOCKET_EMIT_USER_WATCH, id)
        socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

        return () => {
            socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
        }
    }, [id])

    function onUserUpdate(user) {
        showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
        store.dispatch({ type: 'SET_WATCHED_USER', user })
    }

    function onFollow(addFollow) {
        follow(user._id, addFollow)
    }

    function UserButtons() {
        if (!user) return null

        if (id === logedInUserId) {
            return (
                <div className="user-buttons">
                    <button>Edit profile</button>
                    <button>View archive</button>
                    {/* <button>Setting</button> */}
                </div>
            )
        } else {
            return (
                <div className="user-buttons">
                    {(user.followers && user.followers.some(followers => followers._id === logedInUserId)) ? (
                        <button onClick={()=>onFollow(false)}>Unfollow</button>
                    ) : (
                        <button className="follow-btn" onClick={()=>onFollow(true)}>Follow</button>
                    )}
                    <button>Message</button>
                    {/* <button>Setting</button> */}
                </div>
            )
        }
    }

    if (!user) return <></>

    console.log(user)

    const numOfFollowers = user.followers ? user.followers.length : 0
    const numOfFollowings = user.following ? user.following.length : 0

    return (
        <section className="user-details">
            <header className="user-header">
                <div className="user-img">
                    <img src={user.imgUrl} />
                </div>
                <div className="info-top">
                    <p className="username">{user.username}</p>
                    <UserButtons/>
                </div>
                <div className="info-midle">
                    <p>
                        <span>{entrysCount}</span> post{entrysCount === 1 ? '' : 's'}
                    </p>
                    <p>
                        <span>{numOfFollowers}</span> follower{numOfFollowers === 1 ? '' : 's'}
                    </p>
                    <p>
                        <span>{numOfFollowings}</span> following{numOfFollowings === 1 ? '' : 's'}
                    </p>
                </div>
                <div className="info-bottom">
                    <p>{user.fullname}</p>
                </div>
            </header>

            <nav className="user-navigation">
                <NavLink className="nav-item" to="." end>
                    <div className="icon">{entrySvg.grid}</div>
                    <span className="text">Posts</span>
                </NavLink>
                {logedInUserId === user._id && (
                    <NavLink className="nav-item" to="saved">
                        <div className="icon">{entrySvg.save(12)}</div>
                        <span className="text">Saved</span>
                    </NavLink>
                )}
            </nav>
            <Outlet />
            <AppFooter />
        </section>
    )
}

export function UserEntrys() {
    const entrys = useSelector(storeState => storeState.userModule.watchedUserEntrys)

    return <UserEntryList entrys={entrys || []} />
}

export function SavedUserEntrys() {
    return <p>Saved User Entrys</p>
}
