import { useSelector } from "react-redux"
import { onToggleEntryDetailsModal } from "../store/actions/app.actions.js"
import { useLocation } from 'react-router-dom'
import { EntryDetails } from "./EntryDetails.jsx"
import { InstagramLoader } from "./elements/InstagramLoader .jsx"

export function EntryDetailsModal() {
	const watchedEntryId = useSelector((storeState) => storeState.appModule.watchedEntryId)
    const location = useLocation();
    const lastPath = location.pathname

	function onCloseModal() {
		onToggleEntryDetailsModal()
        window.history.replaceState(null, '', `${lastPath}`);
	}

    if(!watchedEntryId) return <InstagramLoader/>

	if (!watchedEntryId) return <></>

    window.history.replaceState(null, '', `/entry/${watchedEntryId}`);

	return (
		<div className="entry-details-modal">
			<button className="close-btn" onClick={onCloseModal}>&times;</button>
			<section className="entry-modal">
				<EntryDetails entryId={watchedEntryId}/>
			</section>
		</div>
	)
}

