import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import { EntryIndex } from './pages/EntryIndex.jsx'
import { Explore } from './pages/Explore.jsx'
import { Direct } from './pages/Direct.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { UserDetails, UserEntrys, SavedUserEntrys } from './pages/UserDetails'

import { Sidebar, SIDEBAR_TYPE_FOOTER, SIDEBAR_TYPE_REGULAR, SIDEBAR_TYPE_HEADER } from './cmps/Sidebar'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { DynamicModal } from './cmps/DynamicModal.jsx'
import { EntryDetailsModal } from './cmps/EntryDetailsModal.jsx'
import { EntryDetailsPage } from './pages/EntryDetailsPage.jsx'
import { PageLoader } from './cmps/PageLoader.jsx'
import { userService } from './services/user'

export function RootCmp() {
    const location = useLocation()
    const hideSidebar = location.pathname === '/login' || location.pathname === '/signup'
    const goToLogin =
        userService.getLoggedinUser() === null && location.pathname !== '/login' && location.pathname !== '/signup'
    const navigate = useNavigate()

    useEffect(() => {
        if (goToLogin) {
            navigate('/login')
        }
    }, [])

    function SideBarContainer({ type = SIDEBAR_TYPE_REGULAR }) {
        return (
            <div className={`sidebar-container sidebar-container-${type}`}>
                {!hideSidebar && <Sidebar type={type} />}
            </div>
        )
    }

    if (goToLogin) return <h1>Proceeding to Log in</h1>

    return (
        <div className={`app ${hideSidebar ? 'no-sidebar' : ''}`}>
            <SideBarContainer type={SIDEBAR_TYPE_REGULAR} />
            <SideBarContainer type={SIDEBAR_TYPE_HEADER} />
            {/* <div className={`sidebar-container sidebar-container-${SIDEBAR_TYPE_REGULAR}`}>
                <Sidebar type={SIDEBAR_TYPE_REGULAR} />
            </div> */}
            {/* <div className={`sidebar-container sidebar-container-${SIDEBAR_TYPE_HEADER}`}>
                <Sidebar type={SIDEBAR_TYPE_HEADER} />
            </div> */}
            <main className="container">
                <UserMsg />
                {/* <PageLoader/> */}
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="/" element={<EntryIndex />} />
                    <Route path="/entry" element={<Navigate to="/" replace />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="p/:entryId" element={<EntryDetailsPage />} />
                    <Route path="user/:id" element={<UserDetails />}>
                        <Route index element={<UserEntrys />} />
                        <Route path="saved" element={<SavedUserEntrys />} />
                    </Route>
                    <Route path="/direct/:id" element={<Direct />} />
                    <Route path="admin" element={<AdminIndex />} />
                </Routes>
            </main>
            <SideBarContainer type={SIDEBAR_TYPE_FOOTER} />
            {/* <div className={`sidebar-container sidebar-container-${SIDEBAR_TYPE_FOOTER}`}>
                <Sidebar type={SIDEBAR_TYPE_FOOTER} />
            </div> */}
            <DynamicModal />
            <EntryDetailsModal />
            {/* <AppFooter /> */}
        </div>
    )
}
