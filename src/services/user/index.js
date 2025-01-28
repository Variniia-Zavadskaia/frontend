const { DEV, VITE_LOCAL } = import.meta.env

import { userService as local } from './user.service.local'
import { userService as remote } from './user.service.remote'

function getEmptyUser() {
    return {
        username: '', 
        password: '', 
        fullname: '',
        imgUrl: 'https://res.cloudinary.com/dqfzhhtfh/image/upload/v1738007970/user_ojp9xs.svg',
        following:[],
        followers:[],
        savedEntryIds:[],
    }
}

const service = VITE_LOCAL === 'true' ? local : remote

// const service = remote

export const userService = { ...service, getEmptyUser }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if(DEV) window.userService = userService