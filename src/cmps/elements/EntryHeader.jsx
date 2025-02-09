import { entrySvg } from '../Svgs'
import { UserIcon } from './UserIcon'
import { UserName } from './UserName'
import { onToggleModal } from '../../store/actions/app.actions'
import { EntryMenu } from '../EntryMenu'
import { getElapsedTime } from '../../services/util.service'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { follow } from '../../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

export function EntryHeader({ entry, withDate = false }) {
    const userBy = entry.by
    const currUserFollowing = useSelector(storeState => storeState.userModule.user.following)
    const currUserId = useSelector(storeState => storeState.userModule.user._id)
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        setFollowing(currUserFollowing && currUserFollowing.some(user => user._id === userBy._id))
    }, [currUserFollowing])

    function onOptions() {
        onToggleModal({
            cmp: EntryMenu,
            props: {
                entry,
            },
        })
    }

    async function onFollow() {
        try {
            setFollowing(true)
            await follow(userBy._id, true)
            showSuccessMsg('Following successful')
        } catch (err) {
            setFollowing(false)
            showErrorMsg('Failed to follow')
        }
    }

    return (
        <header className="entry-header">
            <div className="prof-preview">
                <div className="user-icon">
                    <UserIcon user={userBy} size={32} />
                </div>
                <UserName user={userBy} />
                {withDate && (
                    <Link className="entry-time" to={`/p/${entry._id}`}>
                        {getElapsedTime(entry.date)}
                    </Link>
                )}
                {!following && currUserId !== userBy._id && (
                    <button className="follow-button" onClick={onFollow}>
                        Follow
                    </button>
                )}
            </div>
            <button onClick={onOptions}>{entrySvg.option}</button>
        </header>
    )
}
