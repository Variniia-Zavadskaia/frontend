import { httpService } from '../http.service'

export const entryService = {
    query,
    getById,
    save,
    remove,
    addEntryMsg
}

async function query(filterBy = { txt: '', price: 0 }) {
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
        savedEntry = await httpService.put(`entry/${entry._id}`, entry)
    } else {
        savedEntry = await httpService.post('entry', entry)
    }
    return savedEntry
}

async function addEntryMsg(entryId, txt) {
    const savedMsg = await httpService.post(`entry/${entryId}/msg`, {txt})
    return savedMsg
}