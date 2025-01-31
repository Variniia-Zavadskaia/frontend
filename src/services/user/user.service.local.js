import { storageService } from '../async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER = 'user'

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
}

async function getUsers() {
    const users = await storageService.query(STORAGE_KEY_USER)
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get(STORAGE_KEY_USER, userId)
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY_USER, userId)
}

async function update(_id, field, val) {
    const user = await storageService.get(STORAGE_KEY_USER, _id)

    user[field] = val

    await storageService.put(STORAGE_KEY_USER, user)

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY_USER)
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    const users = await storageService.query(STORAGE_KEY_USER)
    const userExists = users.some(user => user.username === userCred.username)

    if (userExists) throw new Error("username already exists");
    
    if (!userCred.imgUrl) userCred.imgUrl = 'https://res.cloudinary.com/dqfzhhtfh/image/upload/v1738007970/user_ojp9xs.svg'

    const user = await storageService.post(STORAGE_KEY_USER, userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
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

async function follow(followerId, followedId, follow) {
    const followedUser = await storageService.get(STORAGE_KEY_USER, followedId)
    const followingUser = await storageService.get(STORAGE_KEY_USER, followerId)

    if (follow) {
        if (!followedUser.followers) followedUser.followers = []
        if (!followedUser.followers.some(follower => follower._id === followerId)) {
            followedUser.followers.push({_id: followerId, username: followingUser.username, imgUrl: followingUser.imgUrl})
        }

        if (!followingUser.following) followingUser.following = []
        if (!followingUser.following.some(followed => followed._id === followedId)) {
            followingUser.following.push({_id: followedId, username: followedUser.username, imgUrl: followedUser.imgUrl})
        }
    } else {
        if (followedUser.followers) {
            followedUser.followers = followedUser.followers.filter(follower => follower._id !== followerId)
        }
        if (followingUser.following) {
            followingUser.following = followingUser.following.filter(followed => followed._id !== followedId)
        }
    }

    await storageService.put(STORAGE_KEY_USER, followedUser)
    await storageService.put(STORAGE_KEY_USER, followingUser)

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === followingUser._id) saveLoggedinUser(followingUser)

    return {followedUser, followingUser}
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createAdmin() {
    const user = {
        username: 'admin',
        password: 'admin',
        fullname: 'Mustafa Adminsky',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        score: 10000,
    }

    const newUser = await storageService.post(STORAGE_KEY_USER, userCred)
    console.log('newUser: ', newUser)
}