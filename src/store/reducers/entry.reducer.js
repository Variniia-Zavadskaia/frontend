export const SET_ENTRYS = 'SET_ENTRYS'
export const SET_ENTRY = 'SET_ENTRY'
export const REMOVE_ENTRY = 'REMOVE_ENTRY'
export const ADD_ENTRY = 'ADD_ENTRY'
export const UPDATE_ENTRY = 'UPDATE_ENTRY'
export const ADD_ENTRY_MSG = 'ADD_ENTRY_MSG'

const initialState = {
    entrys: [],
    entry: null
}

export function entryReducer(state = initialState, action) {
    var newState = state
    var entrys
    switch (action.type) {
        case SET_ENTRYS:
            newState = { ...state, entrys: action.entrys }
            break
        case SET_ENTRY:
            newState = { ...state, entry: action.entry }
            break
        case REMOVE_ENTRY:
            const lastRemovedCar = state.entrys.find(entry => entry._id === action.entryId)
            entrys = state.entrys.filter(entry => entry._id !== action.entryId)
            newState = { ...state, entrys, lastRemovedCar }
            break
        case ADD_ENTRY:
            newState = { ...state, entrys: [...state.entrys, action.entry] }
            break
        case UPDATE_ENTRY:
            entrys = state.entrys.map(entry => (entry._id === action.entry._id) ? action.entry : entry)
            newState = { ...state, entrys }
            break
        case ADD_ENTRY_MSG:
            newState = { ...state, entry: { ...state.entry, msgs: [...state.entry.msgs || [], action.msg] } }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const entry1 = { _id: 'b101', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }
    const entry2 = { _id: 'b102', vendor: 'Car ' + parseInt(Math.random() * 10), msgs: [] }

    state = entryReducer(state, { type: SET_ENTRYS, entrys: [entry1] })
    console.log('After SET_ENTRYS:', state)

    state = entryReducer(state, { type: ADD_ENTRY, entry: entry2 })
    console.log('After ADD_ENTRY:', state)

    state = entryReducer(state, { type: UPDATE_ENTRY, entry: { ...entry2, vendor: 'Good' } })
    console.log('After UPDATE_ENTRY:', state)

    state = entryReducer(state, { type: REMOVE_ENTRY, entryId: entry2._id })
    console.log('After REMOVE_ENTRY:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = entryReducer(state, { type: ADD_ENTRY_MSG, entryId: entry1._id, msg })
    console.log('After ADD_ENTRY_MSG:', state)

    state = entryReducer(state, { type: REMOVE_ENTRY, entryId: entry1._id })
    console.log('After REMOVE_ENTRY:', state)
}

