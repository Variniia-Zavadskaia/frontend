import React from 'react'

import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { AppFooter } from './AppFooter'
import { UserIcon } from './elements/UserIcon'
import { UserName } from './elements/UserName'

export function Widgets() {
    const user = useSelector(storeState => storeState.userModule.user)

    console.log(user.username)
    console.log(user.fullname)

    return (
        <section className="widgets">
            {user && (
                <div className="menu-item">
                    <UserIcon user={user} size={44} />
                    <div>
                        <UserName className="text first" user={user} />
                        <span className="text second">{user.fullname}</span>
                    </div>
                </div>
            )}
            <div>
                <span>Suggested for you</span>
                <button>See All</button>
            </div>
            <div>
                <NavLink className="menu-item" to={`user/${user._id}`}>
                    <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" />
                    <div>
                        <span className="text first">{user.fullname}</span>
                        <span className="text second">{user.fullname}</span>
                    </div>
                    <button>Follow</button>
                </NavLink>

                <NavLink className="menu-item" to={`user/${user._id}`}>
                    <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" />
                    <div>
                        <span className="text first">{user.fullname}</span>
                        <span className="text second">{user.fullname}</span>
                    </div>
                    <button>Follow</button>
                </NavLink>
                <NavLink className="menu-item" to={`user/${user._id}`}>
                    <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" />
                    <div>
                        <span className="text first">{user.fullname}</span>
                        <span className="text second">{user.fullname}</span>
                    </div>
                    <button>Follow</button>
                </NavLink>
                <NavLink className="menu-item" to={`user/${user._id}`}>
                    <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" />
                    <div>
                        <span className="text first">{user.fullname}</span>
                        <span className="text second">{user.fullname}</span>
                    </div>
                    <button>Follow</button>
                </NavLink>
            </div>
            <AppFooter />
        </section>
    )
}
