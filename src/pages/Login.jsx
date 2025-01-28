import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { loadUsers, login } from '../store/actions/user.actions'
import { sideBarSvg } from '../cmps/Svgs'

export function Login() {
    const users = useSelector(storeState => storeState.userModule.users)
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username) return
        await login(credentials)
        navigate('/entry')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    console.log('gggg')

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">{sideBarSvg.logo}</div>
                <form className="login-form" onSubmit={onLogin}>
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
                    <select name="username" value={credentials.username} onChange={handleChange}>
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user._id} value={user.username}>
                                {user.fullname}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="login-btn">
                        Log in
                    </button>
                </form>
                <div className="divider">
                    <span>OR</span>
                </div>
                <button className="login-facebook-btn">Log in with Facebook</button>
                <p className="forgot-password">Forgot password?</p>
            </div>
            <div className="signup-box">
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    )
}
