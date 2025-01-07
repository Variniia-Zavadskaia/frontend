import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadEntrys, addEntry, updateEntry, removeEntry, addEntryMsg } from '../store/actions/entry.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { entryService } from '../services/entry'
import { userService } from '../services/user'

import { EntryList } from '../cmps/EntryList'
import { EntryFilter } from '../cmps/EntryFilter'
import { Widgets } from '../cmps/Widgets'

export function EntryIndex() {
    const [filterBy, setFilterBy] = useState(entryService.getDefaultFilter())
    const entrys = useSelector(storeState => storeState.entryModule.entrys)

    useEffect(() => {
        loadEntrys(filterBy)
    }, [filterBy])

    async function onRemoveEntry(entryId) {
        try {
            await removeEntry(entryId)
            showSuccessMsg('entry removed')
        } catch (err) {
            showErrorMsg('Cannot remove entry')
        }
    }

    async function onAddEntry() {
        const entry = entryService.getEmptyEntry()
        entry.vendor = prompt('Vendor?')
        try {
            const savedEntry = await addEntry(entry)
            showSuccessMsg(`entry added (id: ${savedEntry._id})`)
        } catch (err) {
            showErrorMsg('Cannot add entry')
        }
    }

    async function onUpdateEntry(entry) {
        const speed = +prompt('New speed?', entry.speed)
        if (speed === 0 || speed === entry.speed) return

        const entryToSave = { ...entry, speed }
        try {
            const savedEntry = await updateEntry(entryToSave)
            showSuccessMsg(`entry updated, new speed: ${savedEntry.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update entry')
        }
    }

    return (
        <section className="entry-index">
            <div className="content">
                <ul className="stories">
                    <li className="story">
                        <img src="https://via.placeholder.com/80" alt="User Story" />
                        <span>Name 1</span>
                    </li>
                    <li className="story">
                        <img src="https://via.placeholder.com/80" alt="User Story" />
                        <span>Name 2</span>
                    </li>
                    <li className="story">
                        <img src="https://via.placeholder.com/80" alt="User Story" />
                        <span>Name 3</span>
                    </li>
                </ul>
                {userService.getLoggedinUser() && <button onClick={onAddEntry}>Add a entry</button>}
                <EntryList entrys={entrys} onRemoveEntry={onRemoveEntry} onUpdateEntry={onUpdateEntry} />
            </div>
            {/* <EntryFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}

            <Widgets className="widgets" />
        </section>
    )
}
