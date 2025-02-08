import React, { useState } from 'react'
import { EntryButtons } from './elements/EntryButtons'
import { EntryHeader } from './elements/EntryHeader'
import { CreateComment } from './elements/CreateComment'
import { UserName } from './elements/UserName'
import { onToggleEntryDetailsModal } from '../store/actions/app.actions'

export function EntryPreview({ entry }) {
    const userBy = entry.by
    const numOfComments = entry.comments ? entry.comments.length : 0
    const [isTruncated, setIsTruncated] = useState(true)

    function openDetailsModal() {
        onToggleEntryDetailsModal(entry._id)
    }

    return (
        <article className="entry-preview">
            <div className="header">
                <EntryHeader entry={entry} withDate={true} />
            </div>

            <div className="entry-image">
                <img src={entry.imgUrl} alt="Post " />
            </div>

            <div className="entry-info">
                <div className="buttons">
                    <EntryButtons entry={entry} />
                </div>
                <div className="entry-comment">
                    {/* <p>
                        <UserName user={userBy} /> {entry.txt}
                    </p> */}
                    <p className="show-more-text">
                        <UserName user={userBy} /> {isTruncated ? entry.txt.slice(0, 150) + '... ' : entry.txt}
                        <span className="toggle-btn" onClick={() => setIsTruncated(!isTruncated)}>
                            {isTruncated && (entry.txt.length > 150) && 'more'}
                        </span>
                    </p>
                </div>
                {numOfComments !== 0 && (
                    <button className="count-comment" onClick={openDetailsModal}>
                        View {numOfComments === 1 ? 1 : 'all ' + numOfComments} comment{numOfComments === 1 ? '' : 's'}
                    </button>
                )}
                <div className="new-comment">
                    <CreateComment entryId={entry._id} />
                </div>
            </div>
        </article>
    )
}
