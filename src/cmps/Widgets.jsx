import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AppFooter } from './AppFooter'
import { UserIcon } from './elements/UserIcon'
import { UserName } from './elements/UserName'
import { shuffleArray } from '../services/util.service'
import { loadSuggestedUsers, loadUsers } from '../store/actions/user.actions'

export function Widgets() {
    // const user = useSelector(storeState => storeState.userModule.user)
    const currUserId = useSelector(storeState => storeState.userModule.user._id)
    const curUserImg = useSelector(storeState => storeState.userModule.user.imgUrl)
    const currUserName = useSelector(storeState => storeState.userModule.user.username)
    const currUserFull = useSelector(storeState => storeState.userModule.user.fullname)
    const suggestedUsers = useSelector(storeState => storeState.userModule.user.suggesedUsers)


    useEffect(() => {
        loadSuggestedUsers()
    }, [])    

    function SuggestedUser(idx) {
        // if (!suggestedUsers) return null

        // const suggestedUser = suggestedUsers[idx]

        return (
            <NavLink className="menu-item" to={`user/${currUserId}`}>
                 {/* <UserIcon user={{ _id: curUserImg, imgUrl: curUserImg }} size={44} /> */}
                 <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" />
                 <div>
                    <UserName className="text first" user={{ _id: currUserId, username: currUserName }} />
                    <span className="text second">{currUserFull}</span>
                </div>
                <button>Follow</button>
            </NavLink>
        )
    }

    return (
        <section className="widgets">
            <div className="menu-item">
                <UserIcon user={{ _id: currUserId, imgUrl: curUserImg }} size={44} />
                <div>
                    <UserName className="text first" user={{ _id: currUserId, username: currUserName }} />
                    <span className="text second">{currUserFull}</span>
                </div>
                <button>Switch</button>
            </div>
            <div className="menu-item">
                <span className="widg-txt">Suggested for you</span>
                <button className="widg-txt-btn">See All</button>
            </div>
            <div>
                <SuggestedUser idx={0}/>
                <SuggestedUser idx={1}/>
                <SuggestedUser idx={2}/>
                <SuggestedUser idx={3}/>
            </div>
            <AppFooter />
        </section>
    )
}
