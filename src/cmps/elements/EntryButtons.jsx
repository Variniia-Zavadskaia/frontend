import React, { useState } from 'react'
import { entrySvg } from '../Svgs'
import { updateEntryLike } from '../../store/actions/entry.actions'
import { LikeButton } from './LikeButton'
import { onToggleEntryDetailsModal } from '../../store/actions/app.actions'
import { showErrorMsg } from '../../services/event-bus.service'

export function EntryButtons({ entry }) {
    //TODO btn share -> open modal with following
    const [likedBy, setLikedBy] = useState([...entry.likedBy])
    const [showMoreMenu, setShowMoreMenu] = useState(false)

    async function updateLikedBy(updatedLikedBy) {
        setLikedBy(updatedLikedBy)
        try {
            await updateEntryLike(entry._id, updatedLikedBy)
        } catch (err) {
            showErrorMsg('Cannot update post like')
            console.log('Cannot update post like', err)
            setLikedBy([...likedBy])
        }
    }

    return (
        <section>
            <div className="entry-buttons">
                <div className="like-share">
                    <div className="action" id="like">
                        <LikeButton likedBy={likedBy} updateLikedBy={updateLikedBy} />
                    </div>
                    <button
                        onClick={() => {
                            onToggleEntryDetailsModal(entry._id)
                        }}
                        className="action" id="comment">
                        {entrySvg.comment}
                    </button>
                    <button className="action" id="share">{entrySvg.share}</button>
                </div>
                <button className="action" id="save">{entrySvg.save()}</button>
            </div>

            {likedBy.length !== 0 && (
                <div className="entry-likes">
                    {likedBy.length} like{likedBy.length === 1 ? '' : 's'}
                </div>
            )}
        </section>
    )
}
