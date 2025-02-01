import React, { useState } from 'react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import { entrySvg } from '../Svgs'
import { userService } from '../../services/user'
import { makeId } from '../../services/util.service'
import { addComment } from '../../store/actions/comment.actions'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

export function CreateComment({ entryId, onSaveComment = null }) {
    const [comment, setComment] = useState({ txt: '', by: userService.getLoggedinUser(), likedBy: []})
    const [showPicker, setShowPicker] = useState(false)

    function handleTextChange(ev) {
        setComment({ ...comment, txt: ev.target.value })
    }

    function handleEmojiSelect(emoji) {
        setComment({ ...comment, txt: comment.txt + emoji.native })
        setShowPicker(false)
    }

    async function addEntryComment(commentToAdd) {
        try {
            await addComment(commentToAdd, entryId)
            showSuccessMsg(`Comment added`)
        } catch (err) {
            showErrorMsg('Cannot add comment')
        }
    }

    function onPostComment() {
        if (comment.txt.trim()) {
            let savedComment = { ...comment }
            savedComment.date = new Date()
            savedComment.id = makeId()
            addEntryComment(savedComment)
            if (onSaveComment) {
                onSaveComment(savedComment)
            }
            setComment({ ...comment, txt: '' })
        }
    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter' && !ev.shiftKey) {
            ev.preventDefault()  
            onPostComment()
        }
    }

    return (
        <div className="create-comment">
            <textarea
                name="txt"
                rows="1"
                value={comment.txt}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown} 
                placeholder="Add a comment..."></textarea>
            {comment.txt.length !== 0 && <button className="post-btn" onClick={onPostComment}>
                Post
            </button>}
            <div className='emoji-container'>
                <button className="emoji-btn" onClick={() => setShowPicker(prev => !prev)}>
                    {entrySvg.emoji(24)}
                </button>
                {showPicker && (
                    <div className="emoji-picker">
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" emojiVersion="14.0" />
                    </div>
                )}
            </div>
        </div>
    )
}
