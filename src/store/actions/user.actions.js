import { userService } from '../../services/user'
import { socketService } from '../../services/socket.service'
import { store } from '../store'

import { showErrorMsg } from '../../services/event-bus.service'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER, SET_WATCHED_USER_ENTRYS } from '../reducers/user.reducer'
import { entryService } from '../../services/entry'


export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()        
        
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const loggedInUser = await userService.login(credentials)
        const user = await userService.getById(loggedInUser._id)

        console.log(user);
        

        store.dispatch({
            type: SET_USER,
            user,
        })
        socketService.login(loggedInUser._id)
        return loggedInUser
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const loggedInUser = await userService.signup(credentials)
        const user = await userService.getById(loggedInUser._id)

        store.dispatch({
            type: SET_USER,
            user,
        })

        socketService.login(loggedInUser._id)
        return loggedInUser
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: userService.getEmptyUser(),
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        store.dispatch({ type: LOADING_START })
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function loadUserEntrys(userId) {
    try {
        const entrys = await entryService.query({ byId: userId })
        // console.log(entrys);
        
        store.dispatch({ type: SET_WATCHED_USER_ENTRYS, entrys })
    } catch (err) {
        showErrorMsg('Cannot load user posts')
        console.log('Cannot load user', err)
    }
}

export async function userUpdate(_id, field, val) {
    try {
        const updatedUser = await userService.update(_id, field, val)
        if (userService.getLoggedinUser()._id === _id) {
            store.dispatch({
                type: SET_USER,
                user: updatedUser,
            })
        }
        return updatedUser
    } catch (err) {
        console.log('Cannot update user', err)
        throw err
    }
}
