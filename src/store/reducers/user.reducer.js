import { userService } from '../../services/user'

export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const SET_WATCHED_USER_ENTRYS = 'SET_WATCHED_USER_ENTRYS'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SAVED_USER_ENTRYS = 'SET_SAVED_USER_ENTRYS'
export const SET_SUGGGESTED_USERS = 'SET_SUGGGESTED_USERS'

const initialState = {
    count: 10,
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null,
    watchedUserEntrys: [],
    watchedUserSavedEntrys: [],
    suggesedUsers: [],
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            console.log(action.user);
            
            newState = { ...state, watchedUser: action.user }
            break
        case SET_WATCHED_USER_ENTRYS:
            newState = { ...state, watchedUserEntrys: action.entrys }
            break
        case SET_SAVED_USER_ENTRYS:
            newState = { ...state, watchedUserSavedEntrys: action.savedEntrys }
            break
        case SET_SUGGGESTED_USERS:
            newState = { ...state, suggesedUsers: action.suggesedUsers }
            
            // console.log(action.suggesedUsers);
            // console.log(newState);
            
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId),
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState
}
