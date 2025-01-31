import { entrySvg } from '../Svgs'
import { UserIcon } from './UserIcon'
import { UserName } from './UserName'
import { onToggleModal } from '../../store/actions/app.actions'
import { EntryMenu } from '../EntryMenu'
import { getElapsedTime } from '../../services/util.service'
import { Link } from 'react-router-dom'

export function EntryHeader({ entry, onRemoveEntry, withDate = false }) {
    const userBy = entry.by

    function onOptions() {
        onToggleModal({
            cmp: EntryMenu,
            props: {
                entry,
                onRemoveEntry
            },
        })
    }

    return (
        <header className="entry-header">
            <div className="prof-preview">
                <div className="user-icon">
                    <UserIcon user={userBy} size={32} />
                </div>
                <UserName user={userBy} />
                {withDate && (
                    <Link className="entry-time" to={`/entry/${entry._id}`}>
                        {getElapsedTime(entry.date)}
                    </Link>
                )}
            </div>
            <button onClick={onOptions}>{entrySvg.option}</button>
        </header>
    )
}
