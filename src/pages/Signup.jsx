import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { signup } from '../store/actions/user.actions'

import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user'
import { sideBarSvg } from '../cmps/Svgs'
import { AppFooter } from '../cmps/AppFooter'

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

        console.log(credentials);
        
        if (credentials.imgUrl === "src/assets/icons/user.svg") {
            console.log("wrong img");
            return;
        }
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        await signup(credentials)
        clearState()
        navigate('/')
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        
        <div className="signup-container">
            <div className="signup-box">
                <div className="logo ">{sideBarSvg.logo}</div>
                <p>
                    Sign up to see photos and videos
                    <br />
                    from your friends.
                </p>
                <form className="signup-form" onSubmit={onSignup}>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Full Name"
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
                    <button type="submit" className="submit-btn">Sign up</button>
                </form>
            </div>
            <div className="login-box">
                <p>
                    Don't have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
          <AppFooter />
        </div>
         
    )
}
