export function UserEntryList({ entrys }) {
    return (
        <section className="user-entry-list">
            {entrys.map(entry => (
                <div key={entry._id} className="entry-image">
                    <img src={entry.imgUrl} />
                </div>
            ))}
        </section>
    )
}
