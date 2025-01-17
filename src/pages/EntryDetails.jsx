import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { entrySvg } from '../cmps/Svgs'
import { UserIcon } from '../cmps/elements/UserIcon'
import { UserName } from '../cmps/elements/UserName'
import { EntryButtons } from '../cmps/elements/EntryButtons'
import { EntryHeader } from '../cmps/elements/EntryHeader'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadEntry, addEntryComment } from '../store/actions/entry.actions'

export function EntryDetails() {
    const { entryId } = useParams()
    const entry = useSelector(storeState => storeState.entryModule.entry)

    const userBy = entry ? entry.by : null
    //   console.log(entry);

    useEffect(() => {
        loadEntry(entryId)
    }, [entryId])

    async function onAddEntryComment(entryId) {
        try {
            await addEntryComment(entryId, 'bla bla ' + parseInt(Math.random() * 10))
            showSuccessMsg(`Entry comment added`)
        } catch (err) {
            showErrorMsg('Cannot add entry comment')
        }
    }

    if (!entry) return <></>

    // console.log(entry);

    return (
        <section className="entry-details-container">
            <div className="entry-details">
                <img className="entry-details-img" src={entry.imgUrl} />
                <div className="side-details">
                    <div className="header-details">
                        <EntryHeader entry={entry} />
                    </div>
                    <div className="comment-container">
                        <div className="comment">
                            <UserIcon user={userBy} />
                            <div className="comment-txt">
                                <p>
                                    <UserName user={userBy} /> {entry.txt}
                                </p>
                            </div>

                            {/* <p>
                                <NavLink to={`user/${userBy._id}`}>{userBy.fullname}</NavLink> {entry.txt}
                            </p> */}
                        </div>
                    </div>
                    <div className="nav-details">
                        <EntryButtons entry={entry} />
                    </div>
                    <div className="new-comment">
                        <img src={userBy.imgUrl} className="icon" />
                        <div>
                            <textarea name="txt" rows="1" placeholder="Add a comment..."></textarea>
                            <button className="emoji">{entrySvg.emoji}</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
