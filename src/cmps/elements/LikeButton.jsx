import { entrySvg } from '../Svgs'

export function LikeButton({isLiked = false, size = 24, handleLike}) {
    return <div className='like-button' onClick={handleLike} style={{ cursor: 'pointer' }}>
        <button className={`action like ${isLiked ? 'liked' : ''}`} aria-label="Like button">
            {isLiked ? entrySvg.fullHeart(size) : entrySvg.heart(size)}
        </button>
    </div>
}