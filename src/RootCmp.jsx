import React from 'react'
import { Routes, Route } from 'react-router'

import { EntryIndex } from './pages/EntryIndex.jsx'
import { Explore } from './pages/Explore.jsx'
import { CommentIndex } from './pages/CommentIndex.jsx'
import { Direct } from './pages/Direct.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { EntryDetails } from './pages/EntryDetails'
import { UserDetails } from './pages/UserDetails'

import { Sidebar } from './cmps/Sidebar'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { DynamicModal } from './cmps/DynamicModal.jsx'

export function RootCmp() {
    return (
        <div className="app">
            <aside className="sidebar">
                <Sidebar />
            </aside>
            <main className="container">
                <UserMsg />
                <Routes>
                    <Route path="entry" element={<EntryIndex />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="entry/:entryId" element={<EntryDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="Comment" element={<CommentIndex />} />
                    <Route path="direct" element={<Direct />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            <DynamicModal />
            {/* <AppFooter /> */}
        </div>
    )
}
