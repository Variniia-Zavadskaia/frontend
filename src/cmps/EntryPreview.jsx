import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { entrySvg } from './Svgs'


import { EntryButtons } from './elements/EntryButtons'
import { EntryHeader } from './elements/EntryHeader'

export function EntryPreview({ entry, onRemoveEntry, onUpdateEntry }) {
    // const user = useSelector(storeState => storeState.userModule.user)
    const userBy = entry.by


    const [likes, setLikes] = useState(entry.likes || 0)
    const [isToggled, setIsToggled] = useState(false)

    const handleLike = () => {
        setIsToggled(!isToggled)
        setLikes(!isToggled ? likes + 1 : likes - 1)
    }

    return (
        <article className="preview">
            <EntryHeader entry={entry} onRemoveEntry={onRemoveEntry} onUpdateEntry={onUpdateEntry}/>

            <div className="entry-image">
                <img src={entry.imgUrl} alt="Post " />
                {/* <img src=" https://picsum.photos/300/300" alt="Post 1" /> */}
            </div>

            {/* {entry.owner && <p>Owner: <span>{entry.owner.fullname}</span></p>} */}
            <div className="entry-info">
                <EntryButtons entry={entry} onUpdateEntry={onUpdateEntry}/>
                <div className="entry-comment">
                    <p>
                        <NavLink to={`/user/${userBy._id}`}>{userBy.fullname}</NavLink> {entry.txt}
                    </p>
                </div>

                {/* <span className="view-comments">View all 20 comments</span> */}
                <div className="entry-comments">
                    <textarea name="txt" placeholder="Add a comment..."></textarea>
                    <button>{entrySvg.emoji}</button>
                </div>
            </div>
        </article>
    )
}
