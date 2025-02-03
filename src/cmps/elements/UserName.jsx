import { useNavigate } from 'react-router'
import { onToggleEntryDetailsModal } from '../../store/actions/app.actions'

export function UserName({user, isLink = true}) {
    const navigate = useNavigate()
 
    function onUserNameClick() {
        if (isLink) {
            navigate(`/user/${user._id}`)
            onToggleEntryDetailsModal()
        }
    }    

    return <span className={`user-name ${isLink ? 'linked' : ''}`}  onClick={onUserNameClick} >{user.username}</span>
}