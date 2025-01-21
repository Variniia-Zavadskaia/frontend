import { useEffect, useState } from 'react'
import { entrySvg } from '../Svgs'
import { useSelector } from 'react-redux'

export function LikeButton({likedBy=[], updateLikedBy, size = 24}) {
    const [isLiked, setIsLiked] = useState(false)
    const _id = useSelector(storeState => storeState.userModule.user._id)
    const username = useSelector(storeState => storeState.userModule.user.username)
    const imgUrl = useSelector(storeState => storeState.userModule.user.imgUrl)

    useEffect(() => {
        setIsLiked(likedBy.some(likedUser => likedUser._id === _id))
    }, [_id])

    function handleLike() {
        let updatedLikedBy

        if (isLiked) {
            // Delete like
            updatedLikedBy = likedBy.filter(likedUser => likedUser._id !== _id)
        } else {
            // Add like
            updatedLikedBy = [...likedBy, { _id, username, imgUrl }]
        }
        setIsLiked(!isLiked)
        updateLikedBy(updatedLikedBy)
    }

    return <div className='like-button' onClick={handleLike} style={{ cursor: 'pointer' }}>
        <button className={`action like ${isLiked ? 'liked' : ''}`} aria-label="Like button">
            {isLiked ? entrySvg.fullHeart(size) : entrySvg.heart(size)}
        </button>
    </div>
}