import { entryService } from '../../services/entry'
import { store } from '../store'
import {
    ADD_ENTRY,
    REMOVE_ENTRY,
    SET_ENTRYS,
    SET_ENTRY,
    UPDATE_ENTRY,
    ADD_ENTRY_COMMENT,
} from '../reducers/entry.reducer'

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

        _entryUpdateState(entry)
        return savedEntry
    } catch (err) {
        console.log('Cannot save entry', err)
        throw err
    }
}

export async function entryUpdate(_id, field, val) {
    try {
        const updatedEntry = await entryService.update(_id, field, val)

        _entryUpdateState(updatedEntry)
        return updatedEntry
    } catch (err) {
        console.log('Cannot update entry', err)
        throw err
    }
}

export async function addComment(entryId, txt) {
    try {
        const entry = await entryService.addComment(entryId, txt)
        _entryUpdateState(entry)
    } catch (err) {
        console.log('commentActions: err in addComment', err)
        throw err
    }
}

export async function removeComment(entryId, commentId) {
    try {
        const entry = await entryService.removeComment(entryId, commentId)
        _entryUpdateState(entry)
    } catch (err) {
        console.log('commentActions: err in removeComment', err)
        throw err
    }
}

export async function updateComment(entryId, commentId, field, val) {
    try {
        const entry = await entryService.updateComment(entryId, commentId, field, val)
        _entryUpdateState(entry)
    } catch (err) {
        console.log('commentActions: err in removeComment', err)
        throw err
    }
}

function _entryUpdateState(entry) {
    store.dispatch(getCmdUpdateEntry(entry))

    if (store.getState().entryModule.entry && store.getState().entryModule.entry._id === entry._id) {
        store.dispatch(getCmdSetEntry(entry))
    }
}

// Command Creators:
function getCmdSetEntrys(entrys) {
    return {
        type: SET_ENTRYS,
        entrys,
    }
}
function getCmdSetEntry(entry) {
    return {
        type: SET_ENTRY,
        entry,
    }
}
function getCmdRemoveEntry(entryId) {
    return {
        type: REMOVE_ENTRY,
        entryId,
    }
}
function getCmdAddEntry(entry) {
    return {
        type: ADD_ENTRY,
        entry,
    }
}
function getCmdUpdateEntry(entry) {
    return {
        type: UPDATE_ENTRY,
        entry,
    }
}
function getCmdAddEntryComment(comment) {
    return {
        type: ADD_ENTRY_COMMENT,
        comment,
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadEntrys()
    await addEntry(entryService.getEmptyEntry())
    await updateEntry({
        //test
        _id: 'm1oC7',
        title: 'Entry-Good',
    })
    await removeEntry('m1oC7')
    // TODO unit test addEntryComment
}
