import { entryService } from '../../services/entry'
import { store } from '../store'
import { ADD_ENTRY, REMOVE_ENTRY, SET_ENTRYS, SET_ENTRY, UPDATE_ENTRY, ADD_ENTRY_MSG } from '../reducers/entry.reducer'

export async function loadEntrys(filterBy) {
    try {
        const entrys = await entryService.query(filterBy)
        store.dispatch(getCmdSetEntrys(entrys))
    } catch (err) {
        console.log('Cannot load entrys', err)
        throw err
    }
}

export async function loadEntry(entryId) {
    // console.log('hhh');
    
    try {
        const entry = await entryService.getById(entryId)
        store.dispatch(getCmdSetEntry(entry))
    } catch (err) {
        console.log('Cannot load entry', err)
        throw err
    }
}


export async function removeEntry(entryId) {
    try {
        await entryService.remove(entryId)
        store.dispatch(getCmdRemoveEntry(entryId))
    } catch (err) {
        console.log('Cannot remove entry', err)
        throw err
    }
}

export async function addEntry(entry) {
    try {
        const savedEntry = await entryService.save(entry)
        store.dispatch(getCmdAddEntry(savedEntry))
        return savedEntry
    } catch (err) {
        console.log('Cannot add entry', err)
        throw err
    }
}

export async function updateEntry(entry) {
    try {
        const savedEntry = await entryService.save(entry)
        store.dispatch(getCmdUpdateEntry(savedEntry))
        return savedEntry
    } catch (err) {
        console.log('Cannot save entry', err)
        throw err
    }
}

export async function addEntryMsg(entryId, txt) {
    try {
        const msg = await entryService.addEntryMsg(entryId, txt)
        store.dispatch(getCmdAddEntryMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add entry msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetEntrys(entrys) {
    return {
        type: SET_ENTRYS,
        entrys
    }
}
function getCmdSetEntry(entry) {
    return {
        type: SET_ENTRY,
        entry
    }
}
function getCmdRemoveEntry(entryId) {
    return {
        type: REMOVE_ENTRY,
        entryId
    }
}
function getCmdAddEntry(entry) {
    return {
        type: ADD_ENTRY,
        entry
    }
}
function getCmdUpdateEntry(entry) {
    return {
        type: UPDATE_ENTRY,
        entry
    }
}
function getCmdAddEntryMsg(msg) {
    return {
        type: ADD_ENTRY_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadEntrys()
    await addEntry(entryService.getEmptyEntry())
    await updateEntry({
        _id: 'm1oC7',
        title: 'Entry-Good',
    })
    await removeEntry('m1oC7')
    // TODO unit test addEntryMsg
}
