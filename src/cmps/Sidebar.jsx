import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { onToggleModal } from '../store/actions/app.actions'
import { CreateEntry } from './CreateEntry.jsx'
import { entrySvg, sideBarSvg } from './Svgs'
import { UserIcon } from './elements/UserIcon.jsx'
// import { MoreMenu } from './MoreMenu.jsx'

export function Sidebar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const [showMoreMenu, setShowMoreMenu] = useState(false)

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
        <div className="sidebar ">
            <NavLink to="entry" className="logo">
                <div>{sideBarSvg.logo}</div>
            </NavLink>
            <div className="menu">
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
                        <UserIcon user={user} size={24} isLink={false}/>
                        <span className="text">Profile</span>
                    </NavLink>
                )}
            </div>
            <div className="more-menu-container">
                {showMoreMenu && (
                    <div className="more-menu modal">
                        <MoreMenu />
                    </div>
                )}
                <div
                    className={`menu-item ${showMoreMenu ? 'active' : ''}`}
                    onClick={() => setShowMoreMenu(prev => !prev)}>
                    <div className="icon">{sideBarSvg.more}</div>
                    <span className="text">More</span>
                </div>
            </div>
        </div>
    )
}

function MoreMenu() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

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
        <div className="more-list">
            <Link className="menu-item" to="/saved">
                <div className="icon">{entrySvg.save}</div>
                <span className="text">Saved</span>
            </Link>
            <Link className="menu-item" onClick={onLogout}>
                <span className="text">Log out</span>
            </Link>
        </div>
    )
}
