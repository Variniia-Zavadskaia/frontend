import { storageService } from '../async-storage.service'
import { userService } from '../user'

export const commentService = {
	add,
	query,
	remove,
}

function query(filterBy) {
	return storageService.query('comment')
}

async function remove(commentId) {
	await storageService.remove('comment', commentId)
}

async function add({ txt, aboutUserId }) {
	const aboutUser = await userService.getById(aboutUserId)
	const commentToAdd = {
		txt,
		byUser: userService.getLoggedinUser(),
		aboutUser: {
			_id: aboutUser._id,
			fullname: aboutUser.fullname,
			imgUrl: aboutUser.imgUrl,
		},
	}

	commentToAdd.byUser.score += 10
	await userService.update(commentToAdd.byUser)

	const addedcomment = await storageService.post('comment', commentToAdd)
	return addedcomment
}