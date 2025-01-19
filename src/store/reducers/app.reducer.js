export const SET_MODAL_DATA = 'SET_MODAL_DATA'
export const SET_WATCHED_ENTRY = 'SET_WATCHED_ENTRY'

const initialState = {
	modalData: null,
    watchedEntryId: '',
}

export function appReducer(state = initialState, cmd = {}) {    
	switch (cmd.type) {
		case SET_MODAL_DATA:
			return {
				...state,
				modalData: cmd.modalData
			}
        case  SET_WATCHED_ENTRY:
            return {
				...state,
				watchedEntryId: cmd.watchedEntryId
			}
		default:
			return state
	}
}