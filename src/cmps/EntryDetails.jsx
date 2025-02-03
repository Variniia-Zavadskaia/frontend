import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { UserIcon } from './elements/UserIcon'
import { EntryButtons } from './elements/EntryButtons'
import { EntryHeader } from './elements/EntryHeader'

import { loadEntry, removeComment, updateComment } from '../store/actions/entry.actions'
import { CreateComment } from './elements/CreateComment'
import { CommentPreview } from './CommentPreview'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { getElapsedTime } from '../services/util.service'

export function EntryDetails({ entryId }) {
    const entry = useSelector(storeState => storeState.entryModule.entry)
    const currUserId = useSelector(storeState => storeState.userModule.user._id)
    const curUserImg = useSelector(storeState => storeState.userModule.user.imgUrl)
    const navigate = useNavigate()

    useEffect(() => {
        loadEntry(entryId)
    }, [])

    if (!entry) return <></>

    console.log(entry)

    const entryMsgComment = {
        txt: entry.txt,
        by: entry.by,
        date: entry.date || undefined,
    }
    const comments = entry.comments ? entry.comments : []

    async function onRemoveComment(commentToRemove) {
        try {
            await removeComment(entryId, commentToRemove.id)
            showSuccessMsg(`Comment removed`)
        } catch (err) {
            showErrorMsg('Cannot remove comment')
        }
    }

    function onUpdateComment(commentId, field, val) {
        updateComment(entryId, commentId, field, val)
    }

    function onRemoveEntry() {
        navigate(`/user/${entry.by._id}`)
    }

    if (entry._id !== entryId) return null

    return (
        <div className="entry-details">
            <div className="img-container">
                <img className="entry-details-img" src={entry.imgUrl} />
            </div>
            <div className="side-details">
                <div className="header-details">
                    <EntryHeader entry={entry} onRemoveEntry={onRemoveEntry} />
                </div>
                <div className="comment-container">
                    <div className="comment-list">
                        <CommentPreview comment={entryMsgComment} isEntryMsg={true} />
                        {comments.map(comment => (
                            <CommentPreview
                                key={comment.id}
                                comment={comment}
                                onRemoveComment={onRemoveComment}
                                onUpdateComment={onUpdateComment}
                            />
                        ))}
                    </div>
                </div>
                <div className="nav-details">
                    <EntryButtons entry={entry} />
                    {entry.date && <p>{getElapsedTime(entry.date)}</p>}
                </div>
                <div className="new-comment">
                    <div className="new-comment-uicon">
                        <UserIcon user={{ _id: currUserId, imgUrl: curUserImg }} size={32} isLink={false} />
                    </div>
                    <div className="new-comment-area">
                        <CreateComment entryId={entry._id} />
                    </div>
                </div>
            </div>
        </div>
    )
}
