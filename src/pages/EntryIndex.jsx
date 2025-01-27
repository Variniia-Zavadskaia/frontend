import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadEntrys, updateEntry } from '../store/actions/entry.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { entryService } from '../services/entry'

import { EntryFilter } from '../cmps/EntryFilter'
import { Widgets } from '../cmps/Widgets'
import { AppFooter } from '../cmps/AppFooter'
import { EntryPreview } from '../cmps/EntryPreview'

export function EntryIndex() {
    const [filterBy, setFilterBy] = useState(entryService.getDefaultFilter())
    const entrys = useSelector(storeState => storeState.entryModule.entrys)

    const randomFaces = [
        'https://randomuser.me/api/portraits/men/1.jpg',
        'https://randomuser.me/api/portraits/women/2.jpg',
        'https://randomuser.me/api/portraits/men/3.jpg',
    ]

    useEffect(() => {
        loadEntrys(filterBy)
    }, [filterBy])

    async function onRemoveEntry(entryId) {
        // try {
        //     await removeEntry(entryId)
        //     showSuccessMsg('entry removed')
        // } catch (err) {
        //     showErrorMsg('Cannot remove entry')
        // }
    }

    // async function onAddEntry() {
    //     const entry = entryService.getEmptyEntry()
    //     entry.vendor = prompt('Vendor?')
    //     try {
    //         const savedEntry = await addEntry(entry)
    //         showSuccessMsg(`entry added (id: ${savedEntry._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add entry')
    //     }
    // }

    async function onUpdateEntry(entry) {
        // const speed = +prompt('New speed?', entry.speed)
        // if (speed === 0 || speed === entry.speed) return

        // const entryToSave = { ...entry, speed }
        const entryToSave = { ...entry }
        try {
            const savedEntry = await updateEntry(entryToSave)
            showSuccessMsg(`entry updated`)
        } catch (err) {
            showErrorMsg('Cannot update entry')
        }
    }

    console.log(entrys)

    return (
        <section className="entry-index">
            <div className="content">
                {/* <ul className="stories">
                    {randomFaces.map((face, idx) => (
                        <li key={idx} className="story">
                            <img src={face} alt={`Random Face ${idx + 1}`} />
                            <span>Name {idx + 1}</span>
                        </li>
                    ))}
                </ul> */}
                <ul className="feed">
                    {entrys.map(entry => (
                        <li key={entry._id}>
                            <EntryPreview entry={entry} onRemoveEntry={onRemoveEntry} onUpdateEntry={onUpdateEntry} />
                        </li>
                    ))}
                </ul>
                <AppFooter />
            </div>
            {/* <EntryFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}

            <div className="widgets-container">
                <Widgets className="widgets-container" />
            </div>
        </section>
    )
}
