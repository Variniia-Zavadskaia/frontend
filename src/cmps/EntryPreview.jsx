import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { entrySvg } from './Svgs'

import { EntryButtons } from './elements/EntryButtons'
import { EntryHeader } from './elements/EntryHeader'
import { CreateComment } from './elements/CreateComment'
import { UserName } from './elements/UserName'

export function EntryPreview({ entry, onRemoveEntry, onUpdateEntry }) {
    // const user = useSelector(storeState => storeState.userModule.user)
    const userBy = entry.by

    return (
        <article className="preview">
            <EntryHeader entry={entry} onRemoveEntry={onRemoveEntry} onUpdateEntry={onUpdateEntry} />

            <div className="entry-image">
                <img src={entry.imgUrl} alt="Post " />
            </div>

            <div className="entry-info">
                <EntryButtons entry={entry} />
                <div className="entry-comment">
                    <p>
                        <UserName user={userBy}/> {entry.txt}
                    </p>
                </div>

                {/* <span className="view-comments">View all 20 comments</span> */}

                <CreateComment entryId={entry._id}/>
            </div>
        </article>
    )
}
