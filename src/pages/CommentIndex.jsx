// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { loadComments, removeComment, getActionAddComment, getActionRemoveComment } from '../store/actions/comment.actions'
// import { loadUsers } from '../store/actions/user.actions'

// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { socketService, SOCKET_EVENT_COMMENT_ADDED, SOCKET_EVENT_COMMENT_REMOVED } from '../services/socket.service'
// import { CommentList } from '../cmps/CommentList'
// import { CommentEdit } from '../cmps/CommentEdit'

// export function CommentIndex() {
// 	const loggedInUser = useSelector(storeState => storeState.userModule.user)
// 	const comments = useSelector(storeState => storeState.commentModule.comments)

// 	const dispatch = useDispatch()

// 	useEffect(() => {
// 		loadComments()
// 		loadUsers()

// 		socketService.on(SOCKET_EVENT_COMMENT_ADDED, comment => {
// 			console.log('GOT from socket', comment)
// 			dispatch(getActionAddComment(comment))
// 		})

// 		socketService.on(SOCKET_EVENT_COMMENT_REMOVED, commentId => {
// 			console.log('GOT from socket', commentId)
// 			dispatch(getActionRemoveComment(commentId))
// 		})

// 		return () => {
//             socketService.off(SOCKET_EVENT_COMMENT_ADDED)
//             socketService.off(SOCKET_EVENT_COMMENT_REMOVED)
//         }
// 	}, [])

// 	async function onRemoveComment(commentId) {
// 		try {
// 			await removeComment(commentId)
// 			showSuccessMsg('Comment removed')
// 		} catch (err) {
// 			showErrorMsg('Cannot remove')
// 		}
// 	}

// 	return <div className="comment-index">
//         <h2>Comments and Gossip</h2>
//         {loggedInUser && <CommentEdit/>}
//         <CommentList 
//             comments={comments} 
//             onRemoveComment={onRemoveComment}/>
//     </div>
// }