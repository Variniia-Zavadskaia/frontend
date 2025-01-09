import React from 'react'

import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

import { onToggleModal } from '../store/actions/app.actions'
import { addEntry } from '../store/actions/entry.actions'

export function Sidebar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    function onAddModal() {
        onToggleModal({ cmp: TestModal })
    }

    function TestModal() {
        
    }

        async function onAddEntry() {
            const entry = entryService.getEmptyEntry()
            entry.vendor = prompt('Vendor?')
            try {
                const savedEntry = await addEntry(entry)
                showSuccessMsg(`entry added (id: ${savedEntry._id})`)
            } catch (err) {
                showErrorMsg('Cannot add entry')
            }
        }
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
        <section className="sidebar full">
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

                    <button className="menu-item">
                        {' '}
                        <img src="src/assets/icons/search.svg" alt="Search Icon" className="icon regular" />
                        <span className="text">Search</span>
                    </button>

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
                    <button className="menu-item" onClick={onAddEntry}>
                        {' '}
                        <img src="src/assets/icons/create.svg" alt="Create Icon" className="icon regular" />
                        <span className="text">Create</span>
                    </button>
                   
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
        </section>
    )
}
