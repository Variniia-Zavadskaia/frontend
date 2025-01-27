import { onToggleEntryDetailsModal } from "../store/actions/app.actions"

export function UserSavedList({ entrys }) {

    function openEntryDetailsModal(entryId) {
        console.log(entryId);
        
        onToggleEntryDetailsModal(entryId)
    }

    return (
        <section className="user-entry-list">
            {entrys.map(entry => (
                <div key={entry._id} className="entry-image">
                    <img src={entry.imgUrl} onClick={() => {openEntryDetailsModal(entry._id)}}/>
                </div>
            ))}
        </section>
    )
}
