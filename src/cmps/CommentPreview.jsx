import { UserIcon } from './elements/UserIcon'
import { UserName } from './elements/UserName'
import { entrySvg } from './Svgs'
import { getElapsedTime } from '../services/util.service'
import { LikeButton } from './elements/LikeButton'
import { useState } from 'react'

export function CommentPreview({ comment, isEntryMsg = false }) {
    const userBy = comment.by
    const [likedBy, setLikedBy] = useState(comment.likedBy ? [...comment.likedBy] : [])
    const [isLiked, setIsLiked] = useState(false)

    function handleLike() {}

    return (
        <article className="comment-preview">
            <UserIcon user={userBy} size={32} />
            <div className="comment-body">
                <div className="body-top" style={{ gap: `${isEntryMsg ? 8 : 4}px`}}>
                    <UserName user={userBy} />
                    {comment.date && <p>{getElapsedTime(comment.date)}</p>}
                </div>
                <p> {comment.txt} </p>
                {!isEntryMsg && (
                    <div className="body-bottom">
                        {likedBy.length !== 0 && <button>
                            {likedBy.length} like{likedBy.length === 1 ? '' : 's'}
                        </button>}
                        <button>{entrySvg.option}</button>
                    </div>
                )}
            </div>
            {!isEntryMsg && <LikeButton isLiked={isLiked} handleLike={handleLike} size={16}/>}
        </article>
    )
}
