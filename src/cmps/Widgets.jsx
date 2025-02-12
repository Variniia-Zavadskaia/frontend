import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { AppFooter } from './AppFooter'
import { UserIcon } from './elements/UserIcon'
import { UserName } from './elements/UserName'
import { follow, loadSuggestedUsers, loadUsers } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function Widgets() {
    const currUserId = useSelector(storeState => storeState.userModule.user._id)
    const curUserImg = useSelector(storeState => storeState.userModule.user.imgUrl)
    const currUserName = useSelector(storeState => storeState.userModule.user.username)
    const currUserFull = useSelector(storeState => storeState.userModule.user.fullname)
    const currUserFollowing = useSelector(storeState => storeState.userModule.user.following)
    const suggestedUsers = useSelector(storeState => storeState.userModule.suggestedUsers)

    useEffect(() => {
        loadSuggestedUsers(currUserId)
    }, [currUserFollowing])

    async function onFollow(userId) {
        try {
            await follow(userId, true)
            showSuccessMsg('Following successful')
        } catch (err) {
            showErrorMsg('Failed to follow')
        }
    }

    function SuggestedUser({ idx }) {
        // console.log(suggestedUsers)
        if (!suggestedUsers || suggestedUsers.length === 0) return null

        const suggestedUser = suggestedUsers[idx]

        return (
            <div className="menu-item">
                <UserIcon user={{ _id: suggestedUser._id, imgUrl: suggestedUser.imgUrl }} size={44} />
                <div>
                    <UserName
                        className="text first"
                        user={{ _id: suggestedUser._id, username: suggestedUser.username }}
                    />
                    <span className="text second">{suggestedUser.fullname}</span>
                </div>
                <button onClick={()=>{onFollow(suggestedUser._id)}}>Follow</button>
            </div>
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
            <div>{suggestedUsers && suggestedUsers.map((user, idx) => <SuggestedUser key={user._id} idx={idx} />)}</div>
            <AppFooter />
        </section>
    )
}
