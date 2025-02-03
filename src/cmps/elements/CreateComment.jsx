import React, { useState } from 'react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import { entrySvg } from '../Svgs'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { addComment } from '../../store/actions/entry.actions'

export function CreateComment({ entryId }) {
    const [txt, setTxt] = useState('')
    const [showPicker, setShowPicker] = useState(false)

    function handleTextChange(ev) {
        setTxt(ev.target.value)
    }

    function handleEmojiSelect(emoji) {
        setTxt(txt + emoji.native)
        setShowPicker(false)
    }

    async function onPostComment() {
        if (txt.trim()) {
            try {
                setTxt('')
                await addComment(entryId, txt)
                showSuccessMsg(`Comment added`)
            } catch (err) {
                showErrorMsg('Cannot add comment')
            }
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
                value={txt}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                placeholder="Add a comment..."></textarea>
            {txt.length !== 0 && (
                <button className="post-btn" onClick={onPostComment}>
                    Post
                </button>
            )}
            <div className="emoji-container">
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
