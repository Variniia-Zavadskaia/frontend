import { httpService } from '../http.service'

export const entryService = {
    query,
    getById,
    save,
    remove,
    update,
    addComment,
    removeComment,
    updateComment,
}

async function query(filterBy = {}) {
    // console.log(filterBy);
    
    return httpService.get(`entry`, filterBy)
}

function getById(entryId) {
    return httpService.get(`entry/${entryId}`)
}

async function remove(entryId) {
    return httpService.delete(`entry/${entryId}`)
}
async function save(entry) {
    var savedEntry
    if (entry._id) {
        savedEntry = await httpService.put(`entry/${entry._id}`, {action: 'full', entry})
    } else {
        savedEntry = await httpService.post('entry', entry)
    }
    return savedEntry
}

async function update(_id, field, val) {
    const updatedEntry = httpService.put(`entry/${_id}`, { action: 'update', field, val })

    return updatedEntry
}

async function addComment(entryId, txt) {
    const entry = await httpService.post(`entry/${entryId}/comment`, {txt})

    return entry
}

async function removeComment(entryId, commentId) {
    const entry = await httpService.delete(`entry/${entryId}/comment/${commentId}`)

    return entry
}

async function updateComment(entryId, commentId, field, val) {
    const updatedEntry = httpService.put(`entry/${entryId}/comment/${commentId}`, { action: 'update', field, val })

    return updatedEntry
}