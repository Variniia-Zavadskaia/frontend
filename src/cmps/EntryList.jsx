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
                        <button onClick={() => onUpdateEntry(entry)}>Edit</button>
                        <button onClick={() => onRemoveEntry(entry._id)}>x</button>
                    </div>}
                </li>)
            }
        </ul>
    </section>
}