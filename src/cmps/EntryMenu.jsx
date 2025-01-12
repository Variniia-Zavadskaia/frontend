import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { onToggleModal } from '../store/actions/app.actions'

export function EntryMenu({ entry, onRemoveEntry, onUpdateEntry }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const owner = entry.by
    const isOwner = user._id === owner._id

async function removeEntry() {
    await onRemoveEntry(entry._id)
    onToggleModal()
}

    return (
        <div className="options-list">
            {isOwner && <button className="delete" onClick={removeEntry}>Delete</button>}
            {isOwner && <button onClick={() => onUpdateEntry(entry)}>Edit</button>}
            {!isOwner && <button>Unfollow</button>}
            <button>Go to post</button>
            <button>Share to...</button>
            <button>Copy link</button>
            <button>About this account</button>
            <button>Cancel</button>
        </div>
    )
}
