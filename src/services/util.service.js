export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// export function getElapsedTime(pastDate, shortFormat = false) {
//     const now = new Date();
//     const past = new Date(pastDate);
//     const timeStr = {
//         d: `d${shortFormat ? '' : 'ay'}`,
//         h: `h${shortFormat ? '' : 'our'}`,
//         m: `m${shortFormat ? '' : 'inute'}`,
//         s: `s${shortFormat ? '' : 'econd'}`,
//     }

//     const differenceInMilliseconds = now - past;
//       const seconds = Math.floor(differenceInMilliseconds / 1000);
//       const minutes = Math.floor(seconds / 60);
//       const hours = Math.floor(minutes / 60);
//       const days = Math.floor(hours / 24);

//       let elapsedTime = '';

//       if (days > 0) {
//         elapsedTime = `${days} ${timeStr['d']}${!shortFormat && days > 1 ? 's' : ''}`;
//       } else if (hours > 0) {
//         elapsedTime = `${hours} ${timeStr['h']}${!shortFormat && hours > 1 ? 's' : ''}`;
//       } else if (minutes > 0) {
//         elapsedTime = `${minutes} ${timeStr['m']}${!shortFormat && minutes > 1 ? 's' : ''}`;
//       } else if (seconds > 0) {
//         elapsedTime = `${seconds} ${timeStr['s']}${!shortFormat && seconds > 1 ? 's' : ''}`;
//       } else {
//         elapsedTime = 'now'
//       }

//       return elapsedTime

// }

export function getElapsedTime(pastDate) {
    const now = new Date();
    const past = new Date(pastDate);

    const differenceInMilliseconds = now - past;
      const seconds = Math.floor(differenceInMilliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let elapsedTime = '';

      if (days > 0) {
        elapsedTime = `${days}d`;
      } else if (hours > 0) {
        elapsedTime = `${hours}h`;
      } else if (minutes > 0) {
        elapsedTime = `${minutes}m`;
      } else if (seconds > 0) {
        elapsedTime = `${seconds}s`;
      } else {
        elapsedTime = 'now'
      }

      return elapsedTime

}

export function shuffleArray(arr) {
    const newArr = [...arr]

    console.log(newArr);
    

    return newArr.sort(() => Math.random() - 0.5);
}