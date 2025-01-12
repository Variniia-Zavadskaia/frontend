import { httpService } from '../http.service'

export const commentService = {
	add,
	query,
	remove,
}

function query(filterBy) {
	var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
	return httpService.get(`comment${queryStr}`)
}

async function remove(commentId) {
	await httpService.delete(`comment/${commentId}`)
}

async function add({ txt, aboutUserId }) {
	return await httpService.post(`comment`, { txt, aboutUserId })
}