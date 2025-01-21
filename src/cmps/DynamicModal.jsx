import { useSelector } from "react-redux"
import { onToggleModal } from "../store/actions/app.actions.js"

export function DynamicModal() {
	const modalData = useSelector((storeState) => storeState.appModule.modalData)

	function onCloseModal() {
		onToggleModal()
	}

	if (!modalData) return <></>
    
	const Cmp = modalData.cmp
    const props = {...modalData.props}
    props.onClose = onCloseModal
    
	return (
		<div className="dynamic-modal">
			<button className="close-btn" onClick={onCloseModal}>&times;</button>
			<section className="modal">
				{Cmp && <Cmp {...props } />}
			</section>
		</div>
	)
}

