import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Outlet } from 'react-router'
import { loadUser } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'

import {
    socketService,
    SOCKET_EMIT_SEND_MSG,
    SOCKET_EVENT_ADD_MSG,
    SOCKET_EMIT_SET_TOPIC,
    SOCKET_EMIT_USER_WATCH,
    SOCKET_EVENT_USER_UPDATED,
} from '../services/socket.service'
import { InstagramLoader } from '../cmps/elements/InstagramLoader '

export function Direct() {
    const { id } = useParams()
    const user = useSelector(storeState => storeState.userModule.watchedUser)
    const logedInUser = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()

    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [topic, setTopic] = useState('Primary')

    useEffect(() => {
        loadUser(id)
        // dispatch({ type: LOADING_DONE })
        console.log('ddd')
        console.log('id from useParams:', id)

        socketService.emit(SOCKET_EMIT_USER_WATCH, id)
        socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

        return () => {
            socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
        }
    }, [id, dispatch])

    function onUserUpdate(user) {
        showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
        store.dispatch({ type: 'SET_WATCHED_USER', user })
    }

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = logedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    if (!user || user._id !== id) return <InstagramLoader />

    console.log(user)
    return (
        <section className="chat-container">
            <section className="chat-list">
                <header className="chat-header">
                    <div className="chat-top">
                        <p className="chat-username">{user.username}</p>
                    </div>
                </header>

                <div className="chat-controls">
                    <nav className="chat-navigation">
                        {['Primary', 'General', 'Requests'].map(opt => (
                            <button
                                key={opt}
                                className={`chat-nav-btn ${topic === opt ? 'active' : ''}`}
                                onClick={() => setTopic(opt)}>
                                {opt}
                            </button>
                        ))}
                    </nav>
                    <Outlet />
                </div>
            </section>
            <section className="chat-mass">
                <div className="chat-start">
                    <span>Your messages</span>
                    <p>Send a message to start a chat.</p>
                    <button>Send message</button>
                </div>

                {/* <ul className="chat-messages">
                    {msgs.map((msg, idx) => (
                        <li key={idx} className={`chat-message ${msg.from === 'Me' ? 'me' : 'them'}`}>
                            <span className="msg-text">{msg.txt}</span>
                        </li>
                    ))}
                </ul>

                <form onSubmit={sendMsg} className="chat-input-area">
                    <input
                        type="text"
                        value={msg.txt}
                        onChange={handleFormChange}
                        name="txt"
                        autoComplete="off"
                        placeholder="Write a message..."
                        className="chat-input"
                    />
                    <button className="send-btn">Send</button>
                </form> */}
            </section>
        </section>
    )
}
