import { httpService } from '../http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
	remove,
	update,
    getLoggedinUser,
    saveLoggedinUser,
    follow,
    getSavedEntrys,
    getSuggestedUsers,
}

function getUsers() {
	return httpService.get(`user`)
}

async function getById(userId) {
	const user = await httpService.get(`user/${userId}`)
	return user
}

function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update(_id, field, val) {
	const user = await httpService.put(`user/${_id}`, { _id, action: 'update', field, val })

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

	return user
}

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred)
	if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
	if (!userCred.imgUrl) userCred.imgUrl = 'https://res.cloudinary.com/dqfzhhtfh/image/upload/v1738007970/user_ojp9xs.svg'

    const user = await httpService.post('auth/signup', userCred)
	return saveLoggedinUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    const loggedInUser = {...user}
    
    delete loggedInUser.password
    
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(loggedInUser))
    
	return loggedInUser
}

async function getSavedEntrys(userId) {
    const entrys = await httpService.get(`user/${userId}/saved`)

    return entrys
}

async function getSuggestedUsers(userId) {
    const users = await httpService.get(`user/${userId}/suggested`)

    console.log(users);
    

    return users
}

async function follow(followerId, followedId, follow) {
    const {followedUser, followingUser} = await httpService.put(`user/${followerId}`, { _id: followerId, action: follow ? 'follow' : 'unfollow', followedId})

    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === followingUser._id) saveLoggedinUser(followingUser)

    return {followedUser, followingUser} 
}