import { Link } from 'react-router-dom'

export function EntryPreview({ entry }) {
    return <article className="preview">
        <header>
            <Link to={`/entry/${entry._id}`}>{entry.vendor}</Link>
        </header>

        <p>Speed: <span>{entry.speed.toLocaleString()} Km/h</span></p>
        {entry.owner && <p>Owner: <span>{entry.owner.fullname}</span></p>}
        
    </article>
}