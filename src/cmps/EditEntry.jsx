import { entrySvg } from './Svgs'
import { useState } from 'react'
import { useSelector } from "react-redux";

export function EditEntry({ entry, onClose, onUpdateEntry }) {
    const [txt, setTxt] = useState(entry.txt)
    const [entryToEdit, setEntryToEdit] = useState({...entry})
    const userBy = entry.by
    
    function handleTxtChange(ev) {
        setTxt(ev.target.value)
        setEntryToEdit(prevEntry => ({ ...prevEntry, txt: ev.target.value }))
    }

    async function updateEntry() {
        await onUpdateEntry(entryToEdit)
        onClose()
    }

    return (
        <div className="edit-entry">
            <header className="edit-entry-header">
                <button onClick={onClose}>Cancel</button>
                <h2>Edit info</h2>
                {/* <button onClick={onAddEntry}>Done</button> */}
                <button onClick={updateEntry}>Done</button>
            </header>

            <section className="edit-entry-body">
                <img src={entryToEdit.imgUrl} />
                <div className="side-edit">

                    <div className='to'>
                        <div className="prof">
                            {userBy.imgUrl && <img src={userBy.imgUrl} className="icon" />}
                            <span className="text first">{userBy.fullname}</span>
                        </div>
                        <textarea name="txt" value={entryToEdit.txt} onChange={handleTxtChange} />
                        <div className="text-footer">
                            <button>{entrySvg.emoji}</button>
                            <p>.../2,200</p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

// ;<div className="caption-area">
//     <textarea
//         // placeholder="Write a caption..."
//         value={text}
//         onChange={handleTextChange}
//     />
// </div>

// ;<button>{entrySvg.emoji}</button>
