// import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { entrySvg } from './Svgs'

export function EntryPreview({ entry }) {
    // const user = useSelector(storeState => storeState.userModule.user)
    const userBy = entry.by

    return (
        <article className="preview">
            <header>
                <NavLink className="menu-item" to={`user/${userBy._id}`}>
                    {userBy.imgUrl && <img src={userBy.imgUrl} className="icon" />}{' '}
                    {/* <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" /> */}
                    <div>
                        <span className="text first">{userBy.fullname}</span>
                    </div>
                    <button>{entrySvg.option}</button>
                </NavLink>
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
                        <NavLink to={`user/${userBy._id}`}>{userBy.fullname}</NavLink> {entry.txt}
                    </p>
                </div>
                <div className="entry-comments">
                    <span className="view-comments">View all 20 comments</span>
                    <p>Add a comment...</p>
                    <button>{entrySvg.emoji}</button>
                </div>
            </div>
        </article>
    )
}
