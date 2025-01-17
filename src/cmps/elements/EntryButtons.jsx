import React, { useState } from 'react'
import { entrySvg } from '../Svgs'

export function EntryButtons({ entry }) {
    //TODO btn comment -> open entry modal
    //TODO btn share -> open modal with following

    const [likes, setLikes] = useState(entry.likes || 0)
    const [isToggled, setIsToggled] = useState(false)

    const handleLike = () => {
        setIsToggled(!isToggled)
        setLikes(!isToggled ? likes + 1 : likes - 1)
    }

    return (
        <section>
            <div className="entry-buttons">
                <div className='like-share'>
                    <div  onClick={handleLike} style={{ cursor: 'pointer' }}>
                        {isToggled ? (
                            <button className="action like">{entrySvg.fullHeart}</button>
                        ) : (
                            <button className="action like">{entrySvg.heart}</button>
                        )}
                    </div>
                    <button className="action comment">{entrySvg.comment}</button>
                    <button className="action share">{entrySvg.share}</button>
                </div>
                <button className="action save">{entrySvg.save}</button>
            </div>

            <div className="entry-likes">{likes} likes</div>
        </section>
    )
}
