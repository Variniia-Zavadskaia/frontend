// import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { entrySvg } from './Svgs'
import { EntryMenu } from './EntryMenu'
import { onToggleModal } from '../store/actions/app.actions'

export function EntryPreview({ entry, onRemoveEntry, onUpdateEntry }) {
    // const user = useSelector(storeState => storeState.userModule.user)
    const userBy = entry.by
    function onOptions() {
        onToggleModal({
            cmp: EntryMenu,
            props: {
                entry,
                onRemoveEntry,
                onUpdateEntry,
            },
        })
    }

    return (
        <article className="preview">
            <header>
                <NavLink className="prof-preview" to={`/user/${userBy._id}`}>
                    {userBy.imgUrl && <img src={userBy.imgUrl} className="icon" />}
                    <span className="text first">{userBy.fullname}</span>
                </NavLink>
                <button onClick={onOptions}>{entrySvg.option}</button>
            </header>

            <div className="entry-image">
                <img src={entry.imgUrl} alt="Post 1" />
                {/* <img src=" https://picsum.photos/300/300" alt="Post 1" /> */}
            </div>

            {/* {entry.owner && <p>Owner: <span>{entry.owner.fullname}</span></p>} */}
            <div className="entry-info">
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

                <div className="entry-likes">... likes</div>
                <div className="entry-comment">
                    <p>
                        <NavLink to={`/user/${userBy._id}`}>{userBy.fullname}</NavLink> {entry.txt}
                    </p>
                </div>

                <span className="view-comments">View all 20 comments</span>
                <div className="entry-comments">
                    <textarea name="txt" placeholder="Add a comment..."></textarea>
                    <button>{entrySvg.emoji}</button>
                </div>
            </div>
        </article>
    )
}
