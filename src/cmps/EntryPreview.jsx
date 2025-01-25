import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { entrySvg } from './Svgs'

import { EntryButtons } from './elements/EntryButtons'
import { EntryHeader } from './elements/EntryHeader'
import { CreateComment } from './elements/CreateComment'
import { UserName } from './elements/UserName'

export function EntryPreview({ entry, onRemoveEntry, onUpdateEntry }) {
    const userBy = entry.by

    return (
        <article className="entry-preview">
            <div className="header">
                <EntryHeader entry={entry} onRemoveEntry={onRemoveEntry} onUpdateEntry={onUpdateEntry} />
            </div>

            <div className="entry-image">
                <img src={entry.imgUrl} alt="Post " />
            </div>

            <div className="entry-info">
                <div className="buttons">
                    <EntryButtons entry={entry} />
                </div>
                <div className="entry-comment">
                    <p>
                        <UserName user={userBy} /> {entry.txt}
                    </p>
                </div>
                <div className="new-comment">
                    <CreateComment entryId={entry._id} />
                </div>
            </div>
        </article>
    )
}
