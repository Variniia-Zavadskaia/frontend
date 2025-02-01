import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadEntrys} from '../store/actions/entry.actions'
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

    console.log(entrys)

    return (
        <section className="entry-index">
            <div className="content">
                <ul className="stories">
                    {randomFaces.map((face, idx) => (
                        <li key={idx} className="story">
                            <img src={face} alt={`Random Face ${idx + 1}`} />
                            <span>Name {idx + 1}</span>
                        </li>
                    ))}
                </ul>
                <ul className="feed">
                    {entrys.map(entry => (
                        <li key={entry._id}>
                            <EntryPreview entry={entry} />
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
