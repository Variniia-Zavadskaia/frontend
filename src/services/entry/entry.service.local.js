import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'entry'

export const entryService = {
    query,
    getById,
    save,
    remove,
    addEntryComment,
}
window.cs = entryService

async function query(filterBy = { txt: '', byId: '', ids: [] }) {
    var entrys = await storageService.query(STORAGE_KEY)
    const { txt, byId, ids } = filterBy

    // console.log(filterBy);
    // console.log(filterBy);

    // if (txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     entrys = entrys.filter(entry => regex.test(entry.vendor) || regex.test(entry.description))
    // }
    if (byId) {
        entrys = entrys.filter(entry => entry.by._id === byId)
    }
    if (ids) {
        entrys = entrys.filter(entry => ids.includes(entry._id))
    }
    // if(sortField === 'vendor' || sortField === 'owner'){
    //     entrys.sort((entry1, entry2) =>
    //         entry1[sortField].localeCompare(entry2[sortField]) * +sortDir)
    // }
    // if(sortField === 'price' || sortField === 'speed'){
    //     entrys.sort((entry1, entry2) =>
    //         (entry1[sortField] - entry2[sortField]) * +sortDir)
    // }

    // entrys = entrys.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return entrys
}

function getById(entryId) {
    return storageService.get(STORAGE_KEY, entryId)
}

async function remove(entryId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, entryId)
}

async function save(entry) {
    var savedEntry
    if (entry._id) {
        const entryToSave = {
            _id: entry._id,
            txt: entry.txt,
            likedBy: entry.likedBy,
            comments: entry.comments,
        }
        savedEntry = await storageService.put(STORAGE_KEY, entryToSave)
    } else {
        const loggedInUser = userService.getLoggedinUser()
        let entryToSave = { ...entry }

        // console.log(entryToSave);

        entryToSave.by = { _id: loggedInUser._id, username: loggedInUser.username, imgUrl: loggedInUser.imgUrl }
        entryToSave.date = new Date()
        savedEntry = await storageService.post(STORAGE_KEY, entryToSave)
    }
    return savedEntry
}

async function addEntryComment(entryId, txt) {
    // Later, this is all done by the backend
    const entry = await getById(entryId)

    const comment = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt,
    }
    entry.comments.push(comment)
    await storageService.put(STORAGE_KEY, entry)

    return comment
}
