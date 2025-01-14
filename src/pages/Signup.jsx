import { useState } from 'react'
import { useNavigate } from 'react-router'

import { signup } from '../store/actions/user.actions'

import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user'
import { sideBarSvg } from '../cmps/Svgs'

export function Signup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    }

    function handleChange(ev) {
        const type = ev.target.type

        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password || !credentials.fullname) return
        await signup(credentials)
        clearState()
        navigate('/entry')
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className='signup-container'>
            <div className='logo custom-size'>{sideBarSvg.logo}</div>
            <p>Sign up to see photos and videos<br/>from your friends.</p>
            <form className="signup-form" onSubmit={onSignup}>
                <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Fullname"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <ImgUploader onUploaded={onUploaded} />
                <button>Sign up</button>
            </form>
        </div>
    )
}
