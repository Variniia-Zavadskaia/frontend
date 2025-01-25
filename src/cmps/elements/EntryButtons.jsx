import React, { useEffect, useState } from 'react'
import { entrySvg } from '../Svgs'
import { updateEntryLike } from '../../store/actions/entry.actions'
import { LikeButton } from './LikeButton'
import { onToggleEntryDetailsModal } from '../../store/actions/app.actions'
import { showErrorMsg } from '../../services/event-bus.service'
import { useSelector } from 'react-redux'

export function EntryButtons({ entry }) {
    //TODO btn share -> open modal with following
    const [likedBy, setLikedBy] = useState([...entry.likedBy])
    const user = useSelector(storeState => storeState.userModule.user)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (user.savedEntryIds)
            setSaved(user.savedEntryIds.some(savedId => savedId === entry._id))
    }, [user])

    
    
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
    
    
    function onSaveEntry() {
        let updatedUser = user
        
        if (!saved) {
            if (!updatedUser.savedEntryIds) updatedUser.savedEntryIds = []
            updatedUser.savedEntryIds.unshift(entry._id)
        } else {
            updatedUser.savedEntryIds.filter(savedId => savedId !== entry._id)
        }
        setSaved(!saved)
    }
    
    console.log(saved);
    
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
                        className="action"
                        id="comment">
                        {entrySvg.comment}
                    </button>
                    <button className="action" id="share">
                        {entrySvg.share}
                    </button>
                </div>
                <button className={`action ${saved ?'saved' : ''}`} id="save" onClick={onSaveEntry}>
                    {entrySvg.save()}
                </button>
            </div>

            {likedBy.length !== 0 && (
                <div className="entry-likes">
                    {likedBy.length} like{likedBy.length === 1 ? '' : 's'}
                </div>
            )}
        </section>
    )
}
