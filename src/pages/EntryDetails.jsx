import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { entrySvg } from '../cmps/Svgs'
import { UserIcon } from '../cmps/elements/UserIcon'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadEntry, addEntryMsg } from '../store/actions/entry.actions'

export function EntryDetails() {
    const { entryId } = useParams()
    const entry = useSelector(storeState => storeState.entryModule.entry)

    const userBy = entry ? entry.by : null
    //   console.log(entry);

    useEffect(() => {
        loadEntry(entryId)
    }, [entryId])

    async function onAddEntryMsg(entryId) {
        try {
            await addEntryMsg(entryId, 'bla bla ' + parseInt(Math.random() * 10))
            showSuccessMsg(`Entry msg added`)
        } catch (err) {
            showErrorMsg('Cannot add entry msg')
        }
    }

    function onOptions() {}

    if (!entry) return <></>

    // console.log(entry);

    return (
        <section className="entry-details-container">
            <div className="entry-details">
                <img className="entry-details-img" src={entry.imgUrl} />
                <div className="side-details">
                    <div className="header-details">
                        <div className="prof-preview">
                            <UserIcon user={userBy} />
                            <span className="full-name">{userBy.fullname}</span>
                        </div>
                        <button onClick={onOptions}>{entrySvg.option}</button>
                    </div>
                    <div className="comment-container">
                        <div className="comment">
                            <UserIcon user={userBy} />
                            <div className="comment-txt">
                                <p>
                                    <span className="full-name">{userBy.fullname}</span> {entry.txt}
                                </p>
                            </div>

                            {/* <p>
                                <NavLink to={`user/${userBy._id}`}>{userBy.fullname}</NavLink> {entry.txt}
                            </p> */}
                        </div>
                    </div>
                    <div className="nav-details">
                        <div className="actions">
                            <button className="action like" onClick={() => onUpdateEntry(entry)}>
                                {entrySvg.heart}
                            </button>
                            <button className="action comment" onClick={() => onUpdateEntry(entry)}>
                                {entrySvg.comment}
                            </button>
                            <button className="action share" onClick={() => onUpdateEntry(entry)}>
                                {entrySvg.share}
                            </button>
                            <button className="action save" onClick={() => onRemoveEntry(entry._id)}>
                                {entrySvg.save}
                            </button>
                        </div>
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
