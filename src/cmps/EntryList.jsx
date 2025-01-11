import { userService } from '../services/user'
import { EntryPreview } from './EntryPreview'
import { entrySvg } from './Svgs'

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
                    {/* {shouldShowActionBtns(entry) && <div className="actions">
                        <button onClick={() => onUpdateEntry(entry)}>{entrySvg.heart}</button>
                        <button onClick={() => onUpdateEntry(entry)}>{entrySvg.comment}</button>
                        <button onClick={() => onUpdateEntry(entry)}>{entrySvg.share}</button>
                        <button onClick={() => onRemoveEntry(entry._id)}>{entrySvg.save}</button>
                    </div>} */}
                   {/* <div className="actions">
                        <button onClick={() => onUpdateEntry(entry)}>{entrySvg.heart}</button>
                        <button onClick={() => onUpdateEntry(entry)}>{entrySvg.comment}</button>
                        <button onClick={() => onUpdateEntry(entry)}>{entrySvg.share}</button>
                        <button onClick={() => onRemoveEntry(entry._id)}>{entrySvg.save}</button>
                    </div>
                    <p> likes</p>
                    <div>
                        <p>Add a comment...</p>
                        <button>{entrySvg.emoji}</button>
                    </div> */}
                </li>)
            }
        </ul>
    </section>
}