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
    update
}
window.cs = entryService

async function query(filterBy = { byId: '', ids: [] }) {
    var entrys = await storageService.query(STORAGE_KEY)
    const { byId, ids } = filterBy

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

    // entrys = entrys.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return entrys
}

function getById(entryId) {
    return storageService.get(STORAGE_KEY, entryId)
}

async function remove(entryId) {
    // throw new Error('Nope')
    // add auth check
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

async function update(_id, field, val) {
    const allowChange = [
        'txt', 'comments', 'likedBy'
    ]
    const onlyOwnerChange = [
        'txt'
    ]

    if (!allowChange.includes(field)) {
        console.log(field + " can not be changed");        
        throw new Error("The change is prohibited"); 
    }
    
    const entry = await storageService.get(STORAGE_KEY, _id)
    if (onlyOwnerChange.includes(field))  {
        const loggedInUser = userService.getLoggedinUser()

        if (loggedInUser._id !== entry.by._id) {
            console.log("Only owner (" + entry.by._id + ") can change", field); 
            throw new Error("The change is prohibited");
        }
    }

    entry[field] = val

    const savedEntry = await storageService.put(STORAGE_KEY, entry)

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
