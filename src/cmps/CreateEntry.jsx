import { sideBarSvg } from './Svgs.jsx'
import { ImgUploader } from './ImgUploader.jsx'
import { useEffect, useState } from 'react'
import { entryService } from '../services/entry/index.js'
import { addEntry, entryUpdate } from '../store/actions/entry.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { entrySvg } from './Svgs.jsx'
import { useSelector } from 'react-redux'
import { UserIcon } from './elements/UserIcon.jsx'
import { UserName } from './elements/UserName.jsx'

export function CreateEntry({ onClose, entry = null }) {
    const isEditMode = entry !== null
    const [step, setStep] = useState(isEditMode ? 'text' : 'img')
    const [imgData, setImgData] = useState({ imgUrl: isEditMode ? entry.imgUrl : null })
    const [entryToSave, setEntryToSave] = useState(isEditMode ? { ...entry } : entryService.getEmptyEntry())
    const [text, setText] = useState(isEditMode ? entry.txt : '')
    const [modalWidth, setModalWidth] = useState(50)
    const maxChars = 2200
    const currUserId = useSelector(storeState => storeState.userModule.user._id)
    const curUserImg = useSelector(storeState => storeState.userModule.user.imgUrl)
    const curUserName = useSelector(storeState => storeState.userModule.user.username)

    useEffect(() => {
        const updateModalWidth = () => {
            const modalHeight = document.querySelector('.add-body .img-container').offsetHeight
            setModalWidth(modalHeight) // Set width equal to height
        }

        updateModalWidth() // Initial call to set width
        window.addEventListener('resize', updateModalWidth) // Update on resize

        return () => {
            window.removeEventListener('resize', updateModalWidth) // Clean up the event listener
        }
    }, [])

    function onUploaded(imgUrl, height, width) {
        setImgData({ imgUrl: imgUrl, width, height })
        setEntryToSave({ ...entryToSave, imgUrl: imgUrl })
    }

    function handleTextChange(ev) {
        setText(ev.target.value)
        setEntryToSave({ ...entryToSave, txt: ev.target.value })
    }

    async function onSave() {
        try {
            let savedEntry
            if (isEditMode) {
                savedEntry = await entryUpdate(entry._id, 'txt', entryToSave.txt)
            } else {
                savedEntry = await addEntry(entryToSave)
            }

            showSuccessMsg(`Entry ${isEditMode ? 'saved' : 'added'}`)
        } catch (err) {
            console.log(`${isEditMode ? 'save' : 'add'} entry error`, err)
            showErrorMsg(`Cannot ${isEditMode ? 'save' : 'add'} entry`)
        }

        onClose()
    }

    function BackButton() {
        if (isEditMode) {
            return <button onClick={onClose}>Cancel</button>
        } else if (step === 'text') {
            return (
                <button
                    onClick={() => {
                        setStep('img')
                    }}>
                    {entrySvg.arrow}
                </button>
            )
        } else if (imgData.imgUrl) {
            return (
                <button
                    onClick={() => {
                        setImgData({ imgUrl: null })
                    }}>
                    {entrySvg.arrow}
                </button>
            )
        } else {
            return null
        }
    }

    function NextButton() {
        if (step === 'text') {
            return (
                <button className="next-button" onClick={onSave}>
                    {isEditMode ? 'Done' : 'Share'}
                </button>
            )
        } else if (imgData.imgUrl) {
            return (
                <button
                    className="next-button"
                    onClick={() => {
                        setStep('text')
                    }}>
                    Next
                </button>
            )
        } else {
            return null
        }
    }

    return (
        <div className="add-entry">
            <header className="add-header">
                <BackButton />
                <h2>Create New Post</h2>
                <NextButton />
            </header>

            <section
                className={`add-body ${step === 'text' ? 'expanded' : ''}`}
                style={{ minWidth: `${modalWidth}px` }}>
                <div className="img-container" style={{ width: `${modalWidth}px` }}>
                    {imgData.imgUrl ? (
                        <img className="preview-image" src={imgData.imgUrl} />
                    ) : (
                        <div className="add-upload-area">
                            <div className="add-upload-icon">{sideBarSvg.uploade}</div>
                            <p className="add-upload-text">Drag photos and videos here</p>
                            <ImgUploader className="upload-btn " onUploaded={onUploaded}></ImgUploader>
                        </div>
                    )}
                </div>

                <div className={`side-edit ${step === 'text' ? 'expanded' : ''}`}>
                    <div className="to">
                        <div className="prof">
                            <div className="user-icon-edit">
                                <UserIcon user={{ _id: currUserId, imgUrl: curUserImg }} size={24} isLink={false} />
                            </div>
                            <UserName
                                className="user-name-edit"
                                user={{ _id: currUserId, username: curUserName }}
                                isLink={false}
                            />
                        </div>
                        <div className="textarea-container">
                            <textarea name="txt" value={text} onChange={handleTextChange} maxLength={maxChars} />
                        </div>
                        <div className="text-footer">
                            <button>{entrySvg.emoji(20)}</button>
                            <div className="counter">
                                {text.length}/{maxChars}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
