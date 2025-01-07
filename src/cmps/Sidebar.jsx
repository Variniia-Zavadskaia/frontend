import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'

import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function Sidebar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            navigate('/')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="sidebar full">
            <nav>
                <NavLink to="entry" className="logo">
                    Instagram
                </NavLink>
                <ul className="menu">

                    <NavLink className="menu-item" to="entry">
                        {/* {' '} */}
                        <img src="src/assets/icons/home.svg" alt="Home Icon" className="icon regular" />
                        <span className="text">Home</span>
                    </NavLink>

                    <NavLink className="menu-item" to="about">
                        {' '}
                        <img src="src/assets/icons/search.svg" alt="Search Icon" className="icon regular" />
                        <span className="text">Search</span>
                    </NavLink>

                    <NavLink className="menu-item" to="explore">
                        <img src="src/assets/icons/explore.svg" alt="Explore Icon" className="icon regular" />
                        <span className="text">Explore</span>
                    </NavLink>

                    {/* <NavLink to="review">Reels</NavLink> */}
                    <NavLink className="menu-item" to="direct">
                        <img src="src/assets/icons/chat.svg" alt="Chat Icon" className="icon regular" />
                        <span className="text">Messages</span>
                    </NavLink>
                    
                    {/* <NavLink to="review">Notification</NavLink> */}
                    <NavLink className="menu-item" to="review">
                        <img src="src/assets/icons/create.svg" alt="Create Icon" className="icon regular" />
                        <span className="text">Create</span>
                    </NavLink>
                   
                    {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

                    {!user && (
                        <NavLink to="login" className="login-link">
                            Login
                        </NavLink>
                    )}
                    {user && (
                        <div className="user-info">
                            <NavLink className="menu-item" to={`user/${user._id}`}>
                                {/* {user.imgUrl && <img src={user.imgUrl} />} */}{' '}
                                <img src="src/assets/icons/profile.svg" alt="Profile Icon" className="icon regular" />
                                <span className="text">Profile</span>
                            </NavLink>
                        </div>
                    )}
                </ul>
                <NavLink className="menu-item" onClick={onLogout}>
                    <img src="src/assets/icons/menu.svg" alt="Menu Icon" className="icon regular" />
                    <span className="text">Logout</span>
                </NavLink>
            </nav>
        </header>
    )
}
