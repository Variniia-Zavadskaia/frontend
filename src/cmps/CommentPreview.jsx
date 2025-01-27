import { UserIcon } from './elements/UserIcon'
import { UserName } from './elements/UserName'
import { entrySvg } from './Svgs'
import { getElapsedTime } from '../services/util.service'
import { LikeButton } from './elements/LikeButton'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { onToggleModal } from '../store/actions/app.actions'
// import { updateCommentLike } from '../store/actions/comment.actions'

export function CommentPreview({ comment, isEntryMsg = false, onRemoveComment, onUpdateComment }) {
    const userBy = comment.by
    const [likedBy, setLikedBy] = useState(comment.likedBy ? [...comment.likedBy] : [])

    function onOptions() {
        onToggleModal({
            cmp: commentMenu,
            props: {
                comment,
                onRemoveComment,
            },
        })
    }

    async function updateLikedBy(updatedLikedBy) {
        setLikedBy(updatedLikedBy)
        comment.likedBy = updatedLikedBy
        onUpdateComment(comment)

        // try {
        //     await updateCommentLike(entry._id, comment.id, updatedLikedBy)
        // } catch (err) {
        //     showErrorMsg('Cannot update comment like')
        //     console.log('Cannot update comment like', err)
        //     setLikedBy([...likedBy])
        // }
    }

    return (
        <article className="comment-preview">
            <UserIcon user={userBy} size={32} />
            <div className="comment-body">
                <div className="body-top" style={{ gap: `${isEntryMsg ? 8 : 4}px` }}>
                    <UserName user={userBy} />
                    {comment.date && <p>{getElapsedTime(comment.date)}</p>}
                </div>
                <p> {comment.txt} </p>
                {!isEntryMsg && (
                    <div className="body-bottom">
                        {likedBy.length !== 0 && (
                            <button>
                                {likedBy.length} like{likedBy.length === 1 ? '' : 's'}
                            </button>
                        )}
                        <button onClick={onOptions}>{entrySvg.option}</button>
                    </div>
                )}
            </div>
            {!isEntryMsg && <LikeButton likedBy={comment.likedBy} updateLikedBy={updateLikedBy} size={16} />}
        </article>
    )
}

function commentMenu({ comment, onRemoveComment, onClose }) {
    const userId = useSelector(storeState => storeState.userModule.user._id)
    const owner = comment.by
    const isOwner = userId === owner._id

    function onReport() {
        // console.log('report')
        showSuccessMsg(`Report is sent`)
        onClose()
    }

    function onRemove() {
        onRemoveComment(comment)
        onClose()
    }

    return (
        <div className="options-list">
            {isOwner && (
                <button className="red-button" onClick={onRemove}>
                    Delete
                </button>
            )}
            {!isOwner && (
                <button className="red-button" onClick={onReport}>
                    Report
                </button>
            )}
            <button onClick={onClose}>Cancel</button>
        </div>
    )
}
