import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { entrySvg } from '../Svgs'

export function EntryButtons({ entry, onUpdateEntry}) {
    //TODO btn comment -> open entry modal
    //TODO btn share -> open modal with following

    const { _id, fullname, imgUrl } = useSelector(storeState => storeState.userModule.user)
    // const [likesCount, setLikesCount] = useState(entry.likedBy.length)
    const [isLiked, setIsLiked] = useState(false)
    const [likedBy, setLikedBy] = useState([...entry.likedBy]);

    useEffect(() => {
        setIsLiked(entry.likedBy.some(likedUser => likedUser._id === _id))
    }, [_id])

    function handleLike() {
        setIsLiked(!isLiked)
        // likesCount(!isLiked ? likesCount + 1 : likesCount - 1)

        let updatedLikedBy;
        if (isLiked) {
            // Delete like
            updatedLikedBy = likedBy.filter((likedUser) => likedUser._id !== _id);
        } else {
            // Add like
            updatedLikedBy = [...likedBy, { _id, fullname, imgUrl }];
        }
        setLikedBy([...updatedLikedBy]);
        
        onUpdateEntry({...entry, likedBy: updatedLikedBy})
    }

    return (
        <section>
            <div className="entry-buttons">
                <div className="like-share">
                    <div onClick={handleLike} style={{ cursor: 'pointer' }}>
                        <button className={`action like ${isLiked ? 'liked' : ''}`} aria-label="Like button">
                            {isLiked ? entrySvg.fullHeart : entrySvg.heart}
                        </button>
                    </div>
                    <button className="action comment">{entrySvg.comment}</button>
                    <button className="action share">{entrySvg.share}</button>
                </div>
                <button className="action save">{entrySvg.save}</button>
            </div>

            <div className="entry-likes">{likedBy.length} likes</div>
        </section>
    )
}
