export const SET_ENTRYS = 'SET_ENTRYS'
export const SET_ENTRY = 'SET_ENTRY'
export const REMOVE_ENTRY = 'REMOVE_ENTRY'
export const ADD_ENTRY = 'ADD_ENTRY'
export const UPDATE_ENTRY = 'UPDATE_ENTRY'
export const ADD_ENTRY_COMMENT = 'ADD_ENTRY_COMMENT'
export const ADD_ENTRY_LIKE = 'ADD_ENTRY_LIKE'

const initialState = {
    entrys: [],
    entry: null,
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
            const lastRemovedEntry = state.entrys.find(entry => entry._id === action.entryId)
            entrys = state.entrys.filter(entry => entry._id !== action.entryId)
            newState = { ...state, entrys, lastRemovedEntry }
            break
        case ADD_ENTRY:
            newState = { ...state, entrys: [action.entry, ...state.entrys] }
            break
        case UPDATE_ENTRY:
            entrys = state.entrys.map(entry => (entry._id === action.entry._id ? action.entry : entry))
            newState = { ...state, entrys }
            // if (state.entry && (action.entry._id === state.entry._id)) {
            //     newState = { ...state, entry: action.entry }
            // }
            break
        case ADD_ENTRY_COMMENT:
            newState = {
                ...state,
                entry: { ...state.entry, comments: [...(state.entry.comments || []), action.comment] },
            }
            break
        case ADD_ENTRY_LIKE:
            entrys = state.entrys.map(entry=>{
                if (entry._id === action.entryId) {
                    entry.likedBy = [...entry.likedBy || [], action.like]
                }
                return entry
            })
            newState = { ...state, entrys }
            break
        default:
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const entry1 = { _id: 'b101', vendor: 'Car ' + parseInt(Math.random() * 10), comments: [] }
    const entry2 = { _id: 'b102', vendor: 'Car ' + parseInt(Math.random() * 10), comments: [] }

    state = entryReducer(state, { type: SET_ENTRYS, entrys: [entry1] })
    console.log('After SET_ENTRYS:', state)

    state = entryReducer(state, { type: ADD_ENTRY, entry: entry2 })
    console.log('After ADD_ENTRY:', state)

    state = entryReducer(state, { type: UPDATE_ENTRY, entry: { ...entry2, vendor: 'Good' } })
    console.log('After UPDATE_ENTRY:', state)

    state = entryReducer(state, { type: REMOVE_ENTRY, entryId: entry2._id })
    console.log('After REMOVE_ENTRY:', state)

    const comment = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some comment' }
    state = entryReducer(state, { type: ADD_ENTRY_COMMENT, entryId: entry1._id, comment })
    console.log('After ADD_ENTRY_COMMENT:', state)

    state = entryReducer(state, { type: REMOVE_ENTRY, entryId: entry1._id })
    console.log('After REMOVE_ENTRY:', state)
}
