import { useNavigate } from 'react-router'
import { onToggleEntryDetailsModal, onToggleModal } from '../store/actions/app.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { removeEntry } from '../store/actions/entry.actions.js'
import { CreateEntry } from './CreateEntry.jsx'
import { follow } from '../store/actions/user.actions.js'
import { userService } from '../services/user/user.service.local.js'

export function EntryMenu({ entry, onClose }) {
    const loggedInUser = userService.getLoggedinUser()
    const navigate = useNavigate()
    const owner = entry.by
    const isOwner = loggedInUser._id === owner._id
    const following = !isOwner && loggedInUser.following && loggedInUser.following.some(followed => followed._id == owner._id)

    async function onRemove() {
        try {
            await removeEntry(entry._id)
            showSuccessMsg('entry removed')
        } catch (err) {
            showErrorMsg('Cannot remove entry')
        }
        onToggleEntryDetailsModal()
        onClose()
    }

    function onGoToPost() {
        navigate(`/entry/${entry._id}`)

        onToggleEntryDetailsModal()
        onClose()
    }

    function editEntry() {
        onToggleModal({
            cmp: CreateEntry,
            props: {
                entry,
                onClose,
            },
        })
    }

    async function onUnfollow() {
        onClose()

        try {
            await follow(owner._id, false)
            showSuccessMsg('Unfollowing successful')
        } catch (err) {
            showErrorMsg('Failed to unfollow')
        }
    }

    return (
        <div className="options-list">
            {isOwner && (
                <button className="red-button" onClick={onRemove}>
                    Delete
                </button>
            )}
            {isOwner && <button onClick={editEntry}>Edit</button>}
            {!isOwner && following && (
                <button className="red-button" onClick={onUnfollow}>
                    Unfollow
                </button>
            )}

            <button onClick={onGoToPost}>Go to post</button>
            {/* <button>Share to...</button> */}
            {/* <button>Copy link</button> */}
            {/* <button>About this account</button> */}
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}
