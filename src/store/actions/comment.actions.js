import { commentService } from '../../services/comment'

import { store } from '../store'
import { ADD_COMMENT, REMOVE_COMMENT, SET_COMMENTS } from '../reducers/comment.reducer'
import { SET_SCORE } from '../reducers/user.reducer'

export async function loadComments() {
	try {
		const comments = await commentService.query()
		store.dispatch({ type: SET_COMMENTS, comments })
	} catch (err) {
		console.log('commentActions: err in loadcomments', err)
		throw err
	}
}

export async function addComment(comment) {
	try {
		const addedcomment = await commentService.add(comment)
		store.dispatch(getActionAddcomment(addedcomment))
		const { score } = addedcomment.byUser
		store.dispatch({ type: SET_SCORE, score })
	} catch (err) {
		console.log('commentActions: err in addcomment', err)
		throw err
	}
}

export async function removeComment(commentId) {
	try {
		await commentService.remove(commentId)
		store.dispatch(getActionRemoveComment(commentId))
	} catch (err) {
		console.log('commentActions: err in removecomment', err)
		throw err
	}
}
// Command Creators
export function getActionRemoveComment(commentId) {
	return { type: REMOVE_COMMENT, commentId }
}
export function getActionAddComment(comment) {
	return { type: ADD_COMMENT, comment }
}
