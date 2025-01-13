
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'entry'

export const entryService = {
    query,
    getById,
    save,
    remove,
    addEntryMsg
}
window.cs = entryService


async function query(filterBy = { txt: '', price: 0 }) {
    var entrys = await storageService.query(STORAGE_KEY)
    // const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    // if (txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     entrys = entrys.filter(entry => regex.test(entry.vendor) || regex.test(entry.description))
    // }
    // if (minSpeed) {
    //     entrys = entrys.filter(entry => entry.speed >= minSpeed)
    // }
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
        }
        savedEntry = await storageService.put(STORAGE_KEY, entryToSave)
    } else {
        // const entryToSave = {
        //     vendor: entry.vendor,
        //     price: entry.price,
        //     speed: entry.speed,
        //     // Later, owner is set by the backend
        //     owner: userService.getLoggedinUser(),
        //     msgs: []
        // }
        const entryToSave = {...entry}
        entryToSave.by = userService.getLoggedinUser()
        savedEntry = await storageService.post(STORAGE_KEY, entryToSave)
    }
    return savedEntry
}

async function addEntryMsg(entryId, txt) {
    // Later, this is all done by the backend
    const entry = await getById(entryId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    entry.msgs.push(msg)
    await storageService.put(STORAGE_KEY, entry)

    return msg
}