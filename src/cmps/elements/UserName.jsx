import { useNavigate } from 'react-router'

export function UserName({user, isLink = true}) {
    const navigate = useNavigate()
 
    function onUserNameClick() {
        if (isLink) {
            navigate(`/user/${user._id}`)
        }
    }    

    return <span className={`user-name ${isLink ? 'linked' : ''}`}  onClick={onUserNameClick} >{user.username}</span>
}