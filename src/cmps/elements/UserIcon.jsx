// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

export function UserIcon({ user, size=60, isLink = true }) {

    const navigate = useNavigate()
    
    function onIconClick() {
        if (isLink) {
            navigate(`/user/${user._id}`)
        }
    }

    return (
        <div className="user-icon" onClick={onIconClick} style={{ width: `${size}px`, height: `${size}px`}}>
            {user.imgUrl && 
                <img src={user.imgUrl} className="user-img" />}
        </div>
    )
}
