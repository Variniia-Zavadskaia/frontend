import { entrySvg } from '../cmps/Svgs'
import { useState } from 'react'
import { UserIcon } from './elements/UserIcon'
import { UserName } from './elements/UserName'

export function EditEntry({ entry, onClose, onUpdateEntry }) {
    const [txt, setTxt] = useState(entry.txt)
    const maxChars = 2200
    const [entryToEdit, setEntryToEdit] = useState({ ...entry })
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
                <button onClick={updateEntry}>Done</button>
            </header>

            <section className="edit-entry-body">
                <img src={entryToEdit.imgUrl} />
                <div className="side-edit">
                    <div className="to">
                        <div className="prof">
                            <UserIcon className="user-icon-edit" user={userBy} size={24} isLink={false} />
                            <UserName className="user-name-edit" user={userBy} isLink={false} />
                        </div>
                        <div className="textarea-container">
                            <textarea
                                name="txt"
                                value={entryToEdit.txt}
                                onChange={handleTxtChange}
                                maxLength={maxChars}
                            />
                        </div>
                        <div className="text-footer">
                            <button>{entrySvg.emoji(20)}</button>
                            <div className="counter">
                                {entryToEdit.txt.length}/{maxChars}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
