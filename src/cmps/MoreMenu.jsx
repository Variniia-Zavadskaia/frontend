import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import { logout } from '../store/actions/user.actions'

import { entrySvg } from '../cmps/Svgs'

export function MoreMenu() {
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
            <NavLink className="menu-item" to="/saved">
                <div className="icon">{entrySvg.save}</div>
                <span className="text">Saved</span>
            </NavLink>
            <NavLink className="more-menu-item logout" onClick={onLogout}>
                <div className="icon">{sideBarSvg.more}</div>
                <span className="text">Logout</span>
            </NavLink>
        </div>
    )
}
