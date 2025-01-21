import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { entrySvg } from '../Svgs'
import { addEntryLike, removeEntryLike } from '../../store/actions/entry.actions'
import { LikeButton } from './LikeButton'
import { onToggleEntryDetailsModal } from '../../store/actions/app.actions'

export function EntryButtons({ entry }) {
    //TODO btn comment -> open entry modal
    //TODO btn share -> open modal with following

    const { _id, fullname, imgUrl } = useSelector(storeState => storeState.userModule.user)
    const [isLiked, setIsLiked] = useState(false)
    const [likedBy, setLikedBy] = useState([...entry.likedBy])

    useEffect(() => {
        setIsLiked(entry.likedBy.some(likedUser => likedUser._id === _id))
    }, [_id])

    function handleLike() {
        setIsLiked(!isLiked)

        let updatedLikedBy
        if (isLiked) {
            // Delete like
            updatedLikedBy = likedBy.filter(likedUser => likedUser._id !== _id)
            removeEntryLike(entry._id, _id)
        } else {
            // Add like
            updatedLikedBy = [...likedBy, { _id, fullname, imgUrl }]
            addEntryLike(entry._id, { _id, fullname, imgUrl })
        }
        setLikedBy([...updatedLikedBy])
    }

    return (
        <section>
            <div className="entry-buttons">
                <div className="like-share">
                    <LikeButton isLiked={isLiked} handleLike={handleLike} />
                    <button onClick={() => {onToggleEntryDetailsModal(entry._id)}} className="action comment">{entrySvg.comment}</button>
                    <button className="action share">{entrySvg.share}</button>
                </div>
                <button className="action save">{entrySvg.save}</button>
            </div>

            {likedBy.length !== 0 && (
                <div className="entry-likes">
                    {likedBy.length} like{likedBy.length === 1 ? '' : 's'}
                </div>
            )}
        </section>
    )
}
