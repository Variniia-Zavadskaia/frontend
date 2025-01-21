import { userService } from '../services/user'
import { EntryPreview } from './EntryPreview'
import { entrySvg } from './Svgs'

export function EntryList({ entrys, onRemoveEntry, onUpdateEntry }) {
    
    return <section>
        <ul className="feed">
            {entrys.map(entry =>
                <li key={entry._id}>
                    <EntryPreview entry={entry} onRemoveEntry={onRemoveEntry} onUpdateEntry={onUpdateEntry}/>
                </li>)
            }
        </ul>
    </section>
}