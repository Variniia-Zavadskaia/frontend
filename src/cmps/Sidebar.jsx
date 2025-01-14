import React from 'react'

import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

import { onToggleModal } from '../store/actions/app.actions'
import { addEntry } from '../store/actions/entry.actions'
import { CreateEntry } from "./CreateEntry.jsx"

import { sideBarSvg } from './Svgs'

export function Sidebar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    function onAddEntry() {
        onToggleModal({ cmp: CreateEntry })
    }

    function TestModal() {}

    // async function onAddEntry() {
    //     const entry = entryService.getEmptyEntry()
    //     entry.vendor = prompt('Vendor?')
    //     try {
    //         const savedEntry = await addEntry(entry)
    //         showSuccessMsg(`entry added (id: ${savedEntry._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add entry')
    //     }
    // }

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
        <section className="sidebar ">
            <nav>
                <NavLink to="entry" className="logo">
                    <div>{sideBarSvg.logo}</div>
                </NavLink>
                <ul className="menu">
                    <NavLink className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')} to="entry">
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
                        // <div className="user-info">
                            <NavLink className="menu-item" to={`/user/${user._id}`}>
                                {user.imgUrl && <img src={user.imgUrl} className='icon' />}{' '}
                                {/* <img src="src/assets/icons/user.svg" alt="Profile Icon" className="icon regular" /> */}
                                <span className="text">Profile</span>
                            </NavLink>
                        // </div>
                    )}
                </ul>
                <NavLink className="menu-item logout" onClick={onLogout}>
                    <div className="icon">{sideBarSvg.more}</div>
                    <span className="text">Logout</span>
                </NavLink>
            </nav>
        </section>
    )
}
