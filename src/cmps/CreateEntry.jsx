import { sideBarSvg } from './Svgs.jsx'
import { ImgUploader } from './ImgUploader'
import { useState } from 'react'
import { entryService } from '../services/entry'
import { addEntry } from '../store/actions/entry.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function CreateEntry({ onClose }) {
    const [imgData, setImgData] = useState({ imgUrl: null })
    const [entry, setEntry] = useState(entryService.getEmptyEntry())
    const [showText, setShowText] = useState(false)
    const [text, setText] = useState('')

    function onUploaded(imgUrl, height, width) {
        setImgData({ imgUrl: imgUrl, width, height })
        setEntry({ ...entry, imgUrl: imgUrl })
    }

    function onSetShowText() {
        setShowText(true)
    }

    function handleTextChange(ev) {
        setText(ev.target.value)
        setEntry({ ...entry, txt: ev.target.value })
    }

    async function onAddEntry() {
        const entryToSave = { ...entry }

        try {
            const savedEntry = await addEntry(entryToSave)
            showSuccessMsg(`entry added (id: ${savedEntry._id})`)
        } catch (err) {
            showErrorMsg('Cannot add entry', err)
        }
        onClose()
    }

    function onBack() {
        if (showText) {
            setShowText(false)
        } else if (imgData.imgUrl) {
            setImgData({ imgUrl: null })
        }
    }

    return (
        <div className="add-entry">
            <header className="add-header">
                {imgData.imgUrl && (
                    <button className="back" onClick={onBack}>
                        &lt;--
                    </button>
                )}
                <h2>Create New Post</h2>
                {imgData.imgUrl && !showText && (
                    <button className="add-entry-btn" onClick={onSetShowText}>
                        Next
                    </button>
                )}
                {showText && (
                    <button className="add-entry-btn" onClick={onAddEntry}>
                        Share
                    </button>
                )}
            </header>

            <div className="add-body">
                <div className="add-upload-area">
                    {imgData.imgUrl ? (
                        <img  src={imgData.imgUrl} alt="Uploaded content" />
                    ) : (
                        <div>
                            <div className="add-upload-icon">{sideBarSvg.uploade}</div>
                            <p className="add-upload-text">Drag photos and videos here</p>

                            <ImgUploader className="upload-btn " onUploaded={onUploaded}></ImgUploader>
                        </div>
                    )}
                </div>

                <div>
                    {showText && (
                        <div className="add-caption-area">
                            <textarea className="add-textarea" value={text} onChange={handleTextChange} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
