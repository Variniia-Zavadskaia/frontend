import React, { useEffect, useState } from 'react'
import { entrySvg } from '../Svgs'
import { entryUpdate} from '../../store/actions/entry.actions'
import { LikeButton } from './LikeButton'
import { onToggleEntryDetailsModal } from '../../store/actions/app.actions'
import { showErrorMsg } from '../../services/event-bus.service'
import { useSelector } from 'react-redux'
import { userUpdate } from '../../store/actions/user.actions'

export function EntryButtons({ entry }) {
    //TODO btn share -> open modal with following
    const [likedBy, setLikedBy] = useState([...entry.likedBy])
    const user = useSelector(storeState => storeState.userModule.user)     
    // console.log(user);
       
    const userId = useSelector(storeState => storeState.userModule.user._id)
    const savedEntryIds = useSelector(storeState => storeState.userModule.user.savedEntryIds)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        setSaved(savedEntryIds.some(savedId => savedId === entry._id))
    }, [savedEntryIds])

    
    
    async function updateLikedBy(updatedLikedBy) {
        setLikedBy(updatedLikedBy)
        try {
            await entryUpdate(entry._id, 'likedBy', updatedLikedBy)
        } catch (err) {
            showErrorMsg('Cannot update post like')
            console.log('Cannot update post like', err)
            setLikedBy([...likedBy])
        }
    }
    
    
    async function onSaveEntry() {
        let updatedEntryIds = [...savedEntryIds]
        
        if (!saved) {
            updatedEntryIds.unshift(entry._id)
        } else {
            updatedEntryIds = updatedEntryIds.filter(savedId => savedId !== entry._id)

            console.log(updatedEntryIds);
            
        }
        setSaved(!saved)


        try {
            await userUpdate(userId, 'savedEntryIds', updatedEntryIds)
        } catch (err) {
            showErrorMsg('Cannot update user saved')
            console.log('Cannot update user saved', err)
        }

    }
    
    // console.log(saved);
    
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
