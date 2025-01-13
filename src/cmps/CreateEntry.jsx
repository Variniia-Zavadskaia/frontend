import { sideBarSvg } from "./Svgs.jsx"
import { ImgUploader } from './ImgUploader'
import { useState } from "react";
import { entryService } from "../services/entry"
import { useSelector } from "react-redux";
import { addEntry } from '../store/actions/entry.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { onToggleModal } from "../store/actions/app.actions.js"

export function CreateEntry({onClose}) {

    const [imgData, setImgData] = useState({ imgUrl: null })
    // const {_id, fullname, imgUrl} = useSelector((storeState) => storeState.userModule.user)
    // const [entry, setEntry] = useState(entryService.getEmptyEntry({_id, fullname, imgUrl}))
    const [entry, setEntry] = useState(entryService.getEmptyEntry()) 
    const [showText, setShowText] = useState(false)
    const [text, setText] = useState('')

    function onUploaded(imgUrl, height, width) {
        setImgData({ imgUrl: imgUrl, width, height })
        setEntry({...entry, imgUrl: imgUrl})
    }

    function onSetShowText() {
        setShowText(true);
    }

    function handleTextChange(ev) {
        setText(ev.target.value);
        setEntry({...entry, txt: ev.target.value})
    }

    async function onAddEntry() {
        try {
            const savedEntry = await addEntry(entry)
            showSuccessMsg(`entry added (id: ${savedEntry._id})`)
        } catch (err) {
            showErrorMsg('Cannot add entry', err)
        }
        // replace by input function
        // onClose()
        onClose()
        // onToggleModal()
    }

    console.log(entry);


    // function onUploaded(imgUrl, height, width) {}

    return (
        <div className="add-entry">
            <header className="add-entry__header">
                <h2>Create New Post</h2>
                {imgData.imgUrl && !showText &&(
                      <button className="add-entry__btn" onClick={onSetShowText}>Next</button> 
                 ) }
                {
                    showText &&( <button className="add-entry__btn" onClick={onAddEntry}>Share</button>) 
                }
            </header>
           
            <div className="add-entry__body">
                <div className="add-entry__upload-area">
                    {imgData.imgUrl ? (
                        <img className="add-entry__image" src={imgData.imgUrl} alt="Uploaded content"/> 
                    ):(
                        <div>
                            <div className="add-entry__upload-icon">{sideBarSvg.uploade}</div>
                            <p className="add-entry__upload-text">Drag photos and videos here</p>
                            <ImgUploader  className="add-entry__btn" onUploaded={onUploaded}></ImgUploader>
                        </div>
                    )}
                </div>

                <div>
                    {showText && (
                        <div className="add-entry__caption-area">
                            <textarea
                             className="add-entry__textarea"
                            // placeholder="Write a caption..."
                            value={text}
                            onChange={handleTextChange}
                            />
                        </div>)}
                </div>
            </div>
        </div>
    )
}
