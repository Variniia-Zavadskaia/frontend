import React from 'react'

import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { AppFooter } from './AppFooter'

export function Widgets() {
    const user = useSelector(storeState => storeState.userModule.user)

    return (
        <section className="widgets">
            {/* {!user && (
                           <NavLink to="login" className="login-link">
                               Login
                           </NavLink>
                       )} */}
            {user && (
                <div>
                    <NavLink className="menu-item" to={`user/${user._id}`}>
                        {/* {user.imgUrl && <img src={user.imgUrl} />} */}{' '}
                        {user.imgUrl && <img src={user.imgUrl} className='icon' />}{' '}
                        {/* <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" /> */}
                        <div>
                            <span className="text first">{user.fullname}</span>
                            <span className="text second">{user.fullname}</span>
                        </div>
                    <button>Switch</button>
                    </NavLink>
                    {/* <button onClick={onLogout}>logout</button> */}
                </div>
            )}
            <div>

            <span>Suggested for you</span>
            <button>See All</button>
            </div>
            <div>
                <NavLink className="menu-item" to={`user/${user._id}`}>
                    {/* {user.imgUrl && <img src={user.imgUrl} />} */}{' '}
                    <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" />
                    <div>
                        <span className="text first">{user.fullname}</span>
                        <span className="text second">{user.fullname}</span>
                    </div>
                    <button>Follow</button>
                </NavLink>
                {/* <button onClick={onLogout}>logout</button> */}
                <NavLink className="menu-item" to={`user/${user._id}`}>
                    {/* {user.imgUrl && <img src={user.imgUrl} />} */}{' '}
                    <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" />
                    <div>
                        <span className="text first">{user.fullname}</span>
                        <span className="text second">{user.fullname}</span>
                    </div>
                    <button>Follow</button>
                </NavLink>
                <NavLink className="menu-item" to={`user/${user._id}`}>
                    {/* {user.imgUrl && <img src={user.imgUrl} />} */}{' '}
                    <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" />
                    <div>
                        <span className="text first">{user.fullname}</span>
                        <span className="text second">{user.fullname}</span>
                    </div>
                    <button>Follow</button>
                </NavLink>
                <NavLink className="menu-item" to={`user/${user._id}`}>
                    {/* {user.imgUrl && <img src={user.imgUrl} />} */}{' '}
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
