import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { UserIcon } from './elements/UserIcon'
import { EntryButtons } from './elements/EntryButtons'
import { EntryHeader } from './elements/EntryHeader'

import { loadEntry } from '../store/actions/entry.actions'
import { CreateComment } from './elements/CreateComment'
import { CommentPreview } from './CommentPreview'
import { removeComment, updateComment } from '../store/actions/comment.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function EntryDetails({ entryId }) {
    const entry = useSelector(storeState => storeState.entryModule.entry)
    const currentUser = useSelector(storeState => storeState.userModule.user)
    const [comments, setComments] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadEntry(entryId)
    }, [])

    useEffect(() => {
        setComments(entry ? [...entry.comments] : [])
    }, [entry])

    if (!entry) return <></>

    console.log(entry)

    const entryMsgComment = {
        txt: entry.txt,
        by: entry.by,
        date: entry.date || undefined,
    }
    // console.log(entry);

    function onSaveComment(comment) {
        setComments([comment, ...comments])
    }

    async function onRemoveComment(commentToRemove) {
        try {
            await removeComment(commentToRemove.id, entryId)
            showSuccessMsg(`Comment removed`)

            const updatedComments = comments.filter(comment => comment.id !== commentToRemove.id)
            setComments([...updatedComments])
        } catch (err) {
            showErrorMsg('Cannot remove comment')
        }
    }

    function onUpdateComment(commentToUpdate) {
        updateComment(commentToUpdate, entryId)
    }

    function onRemoveEntry() {
        navigate(`/user/${entry.by._id}`)
    }

    return (
        <div className="entry-details">
            <img className="entry-details-img" src={entry.imgUrl} />
            <div className="side-details">
                <div className="header-details">
                    <EntryHeader entry={entry} onRemoveEntry={onRemoveEntry} />
                </div>
                <div className="comment-container">
                    <CommentPreview comment={entryMsgComment} isEntryMsg={true} />
                    <ul className="comment-list">
                        {comments.map(comment => (
                            <li key={comment.id}>
                                <CommentPreview
                                    comment={comment}
                                    onRemoveComment={onRemoveComment}
                                    onUpdateComment={onUpdateComment}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="nav-details">
                    <EntryButtons entry={entry} />
                </div>
                <div className="new-comment">
                    <UserIcon user={currentUser} size={32} isLink={false} />
                    <div className="new-comment-area">
                        <CreateComment entryId={entry._id} onSaveComment={onSaveComment} />
                    </div>
                </div>
            </div>
        </div>
    )
}
