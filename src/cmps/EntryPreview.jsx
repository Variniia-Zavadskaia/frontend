// import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { entrySvg } from './Svgs'
import { EntryMenu } from './EntryMenu'
import { onToggleModal } from '../store/actions/app.actions'
import React, { useState } from 'react'
import { UserIcon } from './elements/UserIcon'
import { UserName } from './elements/UserName'
// import { LikeButtom } from './elements/LikeButton'

export function EntryPreview({ entry, onRemoveEntry, onUpdateEntry }) {
    // const user = useSelector(storeState => storeState.userModule.user)
    const userBy = entry.by
    function onOptions() {
        onToggleModal({
            cmp: EntryMenu,
            props: {
                entry,
                onRemoveEntry,
                onUpdateEntry,
            },
        })
    }

    const [likes, setLikes] = useState(entry.likes || 0)
    const [liked, setLiked] = useState(false)

    const handleLike = () => {
        setLiked(!liked)
        setLikes(liked ? likes - 1 : likes + 1)
    }
    const heartIcon = React.cloneElement(entrySvg.heart, {
        fill: liked ? 'red' : 'black',
        // stroke: liked ? 'red' : 'black',
    })

    return (
        <article className="preview">
            <header>
                <div className="prof-preview">
                    <UserIcon user={userBy} size={32}/>
                    <UserName calssName="text first" user={userBy} />
                </div>
                <button onClick={onOptions}>{entrySvg.option}</button>
            </header>

            <div className="entry-image">
                <img src={entry.imgUrl} alt="Post 1" />
                {/* <img src=" https://picsum.photos/300/300" alt="Post 1" /> */}
            </div>

            {/* {entry.owner && <p>Owner: <span>{entry.owner.fullname}</span></p>} */}
            <div className="entry-info">
                <div className="actions">
                    <button className="action like" onClick={handleLike}>
                        {heartIcon}
                    </button>
                    <button className="action comment">{entrySvg.comment}</button>
                    <button className="action share">{entrySvg.share}</button>
                    <button className="action save">{entrySvg.save}</button>
                </div>

                <div className="entry-likes">{likes} Likes</div>
                <div className="entry-comment">
                    <p>
                        <NavLink to={`/user/${userBy._id}`}>{userBy.fullname}</NavLink> {entry.txt}
                    </p>
                </div>

                <span className="view-comments">View all 20 comments</span>
                <div className="entry-comments">
                    <textarea name="txt" placeholder="Add a comment..."></textarea>
                    <button>{entrySvg.emoji}</button>
                </div>
            </div>
        </article>
    )
}
