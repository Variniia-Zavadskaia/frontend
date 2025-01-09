import { userService } from '../services/user'
import { EntryPreview } from './EntryPreview'

export function EntryList({ entrys, onRemoveEntry, onUpdateEntry }) {
    
    function shouldShowActionBtns(entry) {
        const user = userService.getLoggedinUser()
        
        if (!user) return false
        if (user.isAdmin) return true
        return entry.owner?._id === user._id
    }

    return <section>
        <ul className="feed">
            {entrys.map(entry =>
                <li key={entry._id}>
                    <EntryPreview entry={entry}/>
                    {shouldShowActionBtns(entry) && <div className="actions">
                        <button onClick={() => onUpdateEntry(entry)}>Like</button>
                        <button onClick={() => onUpdateEntry(entry)}>Comments</button>
                        <button onClick={() => onUpdateEntry(entry)}>Share</button>
                        <button onClick={() => onRemoveEntry(entry._id)}>Save</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}