import { useParams } from "react-router";
import { EntryDetails } from "../cmps/EntryDetails";

export function EntryDetailsPage() {
    const { entryId } = useParams()

    return (
        <section className="entry-details-container">
            <EntryDetails entryId={entryId}/>
        </section>
    )
    
}