import { useNavigate } from 'react-router'
import { onToggleEntryDetailsModal } from '../../store/actions/app.actions'

export function UserIcon({ user, size=60, isLink = true }) {

    const navigate = useNavigate()
    
    function onIconClick() {
        if (isLink) {
            navigate(`/user/${user._id}`)
            onToggleEntryDetailsModal()
        }
    }

    return (
        <div className={`user-icon ${isLink ? 'linked' : ''}`} onClick={onIconClick} style={{ width: `${size}px`, height: `${size}px`}}>
            {user.imgUrl && 
                <img src={user.imgUrl} className="user-img" />}
        </div>
    )
}
