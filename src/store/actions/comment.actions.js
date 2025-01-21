// import { commentService } from '../../services/comment'

// import { store } from '../store'
// import { ADD_COMMENT, REMOVE_COMMENT, SET_COMMENTS } from '../reducers/comment.reducer'
// import { SET_SCORE } from '../reducers/user.reducer'
import { updateEntry } from './entry.actions'

// export async function loadComments() {
// 	try {
// 		const comments = await commentService.query()
// 		store.dispatch({ type: SET_COMMENTS, comments })
// 	} catch (err) {
// 		console.log('commentActions: err in loadcomments', err)
// 		throw err
// 	}
// }

export async function addComment(comment, entryId) {
    try {
        let entry = await entryService.getById(entryId)
        entry.comments = [comment, ...entry.comments]

        await updateEntry(entry)
    } catch (err) {
        console.log('commentActions: err in addComment', err)
        throw err
    }
}

export async function removeComment(commentId, entryId) {
    try {
        let entry = await entryService.getById(entryId)
        entry.comments = entry.comments.filter(comment => comment.id !== commentId)
        await updateEntry(entry)
    } catch (err) {
        console.log('commentActions: err in removeComment', err)
        throw err
    }
}

export async function updateComment(commentToUpdate, entryId) {
    // console.log('commentToUpdate:', commentToUpdate)

    try {
        let entry = await entryService.getById(entryId)
        // console.log('entry:', entry)

        entry.comments = entry.comments.map(comment => (comment.id === commentToUpdate.id ? commentToUpdate : comment))
        await updateEntry(entry)
    } catch (err) {
        console.log('commentActions: err in updateCommentLike', err)
        throw err
    }
}

// export async function removeComment(commentId) {
// 	try {
// 		await commentService.remove(commentId)
// 		store.dispatch(getActionRemoveComment(commentId))
// 	} catch (err) {
// 		console.log('commentActions: err in removecomment', err)
// 		throw err
// 	}
// }
// Command Creators
// export function getActionRemoveComment(commentId) {
// 	return { type: REMOVE_COMMENT, commentId }
// }
// export function getActionAddComment(comment) {
// 	return { type: ADD_COMMENT, comment }
// }
