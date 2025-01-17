import { entrySvg } from '../Svgs'
import { UserIcon } from './UserIcon'
import { UserName } from './UserName'
import { onToggleModal } from '../../store/actions/app.actions'
import { EntryMenu } from '../EntryMenu'

export function EntryHeader({entry, onRemoveEntry, onUpdateEntry}) {
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
        <header className="entry-header">
            <div className="prof-preview">
                <UserIcon user={userBy} size={32} />
                <UserName calssName="text first" user={userBy} />
            </div>
            <button onClick={onOptions}>{entrySvg.option}</button>
        </header>
    )
}
