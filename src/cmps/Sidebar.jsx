import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { onToggleModal } from '../store/actions/app.actions'
import { CreateEntry } from './CreateEntry.jsx'
import { sideBarSvg } from './Svgs'

export function Sidebar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    function onAddEntry() {
        onToggleModal({ cmp: CreateEntry })
    }

    async function onLogout() {
        try {
            await logout()
            navigate('/login')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <nav className="sidebar ">
            <NavLink to="entry" className="logo">
                <div>{sideBarSvg.logo}</div>
            </NavLink>
            <ul className="menu">
                <NavLink className="menu-item" to="entry">
                    <div className="icon">{sideBarSvg.home}</div>
                    <span className="text">Home</span>
                </NavLink>

                <button className="menu-item">
                    <div className="icon">{sideBarSvg.search}</div>
                    <span className="text">Search</span>
                </button>

                <NavLink className="menu-item" to="explore">
                    <div className="icon">{sideBarSvg.explore}</div>
                    <span className="text">Explore</span>
                </NavLink>

                {/* <NavLink to="review">Reels</NavLink> */}
                <NavLink className="menu-item" to="direct">
                    <div className="icon">{sideBarSvg.messages}</div>
                    <span className="text">Messages</span>
                </NavLink>

                {/* <NavLink to="review">Notification</NavLink> */}
                <button className="menu-item" onClick={onAddEntry}>
                    <div className="icon">{sideBarSvg.create}</div>
                    <span className="text">Create</span>
                </button>

                {/* {!user && (
                        <NavLink to="login" className="login-link">
                            Login
                        </NavLink>
                    )} */}
                {user && (
                    <NavLink className="menu-item" to={`/user/${user._id}`}>
                        {user.imgUrl && <img src={user.imgUrl} className="icon" />}{' '}
                        <span className="text">Profile</span>
                    </NavLink>
                )}
            </ul>
            <NavLink className="menu-item logout" onClick={onLogout}>
                <div className="icon">{sideBarSvg.more}</div>
                <span className="text">Logout</span>
            </NavLink>
        </nav>
    )
}
