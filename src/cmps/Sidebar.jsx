import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { onToggleModal } from '../store/actions/app.actions'
import { CreateEntry } from './CreateEntry.jsx'
import { entrySvg, sideBarSvg } from './Svgs'
import { UserIcon } from './elements/UserIcon.jsx'

export const SIDEBAR_TYPE_REGULAR = 'regular'
export const SIDEBAR_TYPE_FOOTER = 'footer'
export const SIDEBAR_TYPE_HEADER = 'header'

export function Sidebar({ type = SIDEBAR_TYPE_REGULAR }) {
    const currUserId = useSelector(storeState => storeState.userModule.user._id)
    const curUserImg = useSelector(storeState => storeState.userModule.user.imgUrl)
    const [showMoreMenu, setShowMoreMenu] = useState(false)

    function onAddEntry() {
        onToggleModal({ cmp: CreateEntry })
    }

    function onCloseMoreMenu() {
        setShowMoreMenu(false)
    }

    return (
        <div className={`sidebar sidebar-${type}`}>
            <Link to="entry" className={`logo ${type !== SIDEBAR_TYPE_REGULAR ? 'sidebar-item' : ''}`}>
                <div className="full-logo">
                    <div className="logo-text">{sideBarSvg.logo}</div>
                </div>
                <div className="icon-logo">
                    <div className="sidebar-item">{sideBarSvg.logoMini}</div>
                </div>
            </Link>
            <div className="menu">
                <NavLink className="sidebar-item sidebar-menu-item" id="home" to="entry">
                    <div className="icon">{sideBarSvg.home}</div>
                    <span className="text">Home</span>
                </NavLink>

                <button className="sidebar-item sidebar-menu-item" id="search">
                    <div className="icon">{sideBarSvg.search}</div>
                    <span className="text">Search</span>
                </button>

                <NavLink className="sidebar-item sidebar-menu-item" id="explore" to="explore">
                    <div className="icon">{sideBarSvg.explore}</div>
                    <span className="text">Explore</span>
                </NavLink>

                {/* <NavLink to="review">Reels</NavLink> */}
                <NavLink className="sidebar-item sidebar-menu-item" id="message" to="direct">
                    <div className="icon">{sideBarSvg.messages}</div>
                    <span className="text">Messages</span>
                </NavLink>

                {/* <NavLink to="review">Notification</NavLink> */}
                <button className="sidebar-item sidebar-menu-item" id="create" onClick={onAddEntry}>
                    <div className="icon">{sideBarSvg.create}</div>
                    <span className="text">Create</span>
                </button>

                {/* {!user && (
                        <NavLink to="login" className="login-link">
                            Login
                        </NavLink>
                    )} */}
                <NavLink className="sidebar-item sidebar-menu-item" id="profile" to={`/user/${currUserId}`}>
                    <UserIcon user={{ _id: currUserId, imgUrl: curUserImg }} size={24} isLink={false} />
                    <span className="text">Profile</span>
                </NavLink>
            </div>
            <div className="more-menu-container">
                {showMoreMenu && (
                    <div className="more-menu modal">
                        <MoreMenu onClose={onCloseMoreMenu} />
                    </div>
                )}
                <div
                    className={`sidebar-item sidebar-menu-item ${showMoreMenu ? 'active' : ''}`}
                    onClick={() => setShowMoreMenu(prev => !prev)}>
                    <div className="icon">{sideBarSvg.more}</div>
                    <span className="text">More</span>
                </div>
            </div>
        </div>
    )
}

function MoreMenu({ onClose }) {
    const navigate = useNavigate()
    const menuRef = useRef(null)
    

    useEffect(() => {
        const handleOutsideClick = event => {

            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [onClose])

    async function onLogout() {
        try {
            await logout()
            navigate('/login')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        } finally {
            onClose()
        }
    }

    return (
        <div ref={menuRef} className="more-list">
            <Link className="sidebar-item more-item" to="/saved">
                <div className="icon">{entrySvg.save()}</div>
                <span className="text">Saved</span>
            </Link>
            <Link className="sidebar-item more-item" onClick={onLogout}>
                <span className="text">Log out</span>
            </Link>
        </div>
    )
}
