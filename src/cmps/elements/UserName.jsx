import { useNavigate } from 'react-router'

export function UserName({user, isLink = true}) {
    const navigate = useNavigate()
 
    function onUserNameClick() {
        if (isLink) {
            navigate(`/user/${user._id}`)
        }
    }    
    
    // console.log(user); 
    

    return <span className="user-name" onClick={onUserNameClick} >{user.username}</span>
}