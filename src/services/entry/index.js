const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { entryService as local } from './entry.service.local'
import { entryService as remote } from './entry.service.remote'

function getEmptyEntry(user = null) {
	return {
        txt: '',
        imgUrl: null,
        by: user,
        comments: [],
        likedBy: []
	}
}

function getDefaultFilter() {
    return {
        txt: '',
        // minSpeed: '',
        // sortField: '',
        // sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
// const service = remote
export const entryService = { getEmptyEntry, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.entryService = entryService
