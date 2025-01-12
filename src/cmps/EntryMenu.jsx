import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { onToggleModal } from '../store/actions/app.actions'

export function EntryMenu({ entry, onRemoveEntry, onUpdateEntry, onClose }) {
    const user = useSelector(storeState => storeState.userModule.user)
    const owner = entry.by
    const isOwner = user._id === owner._id

async function removeEntry() {
    await onRemoveEntry(entry._id)
    onClose()
}

    return (
        <div className="options-list">
            {isOwner && <button className="delete" onClick={removeEntry}>Delete</button>}
            {isOwner && <button onClick={() => onUpdateEntry(entry)}>Edit</button>}
            {!isOwner && <button className='unfollow' >Unfollow</button>}
            <NavLink className="menu-item" to="entry/:entryId">Go to post</NavLink>
            <button>Share to...</button>
            <button>Copy link</button>
            <button>About this account</button>
            <button>Cancel</button>
        </div>
    )
}
