import { useSelector } from "react-redux"
import { onToggleModal } from "../store/actions/app.actions.js"
import { sideBarSvg } from "./Svgs.jsx"



export function DynamicModal() {
	const modalData = useSelector((storeState) => storeState.appModule.modalData)

	function onCloseModal() {
		onToggleModal()
	}

	console.log('modalData', modalData)
	if (!modalData) return <></>
	const Cmp = modalData.cmp
	// return (
	// 	<div className="dynamic-modal">
	// 		<button className="close" onClick={onCloseModal}>X</button>
	// 		<section className="content">
	// 			{Cmp && <Cmp {...modalData.props} />}
	// 		</section>
	// 	</div>
	// )

    return (
        <div className="modal-overlay">
            <button className="close-btn" onClick={onCloseModal}>&times;</button>
        <div className="modal">
          <header className="modal-header">
            <h2>Create New Post</h2>
          </header>
          <div className="modal-body">
            <div className="image-upload-area">
             <div>{sideBarSvg.uploade}</div>
              <p>Drag photos and videos here</p>
              <button className="upload-btn">Select from computer</button>
            </div>
          </div>
        </div>
      </div>
	)

}

