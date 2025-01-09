// import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

export function EntryPreview({ entry }) {
     const user = useSelector(storeState => storeState.userModule.user)
    return <article className="preview">
        <header>
             <NavLink className="menu-item" to={`user/${user._id}`}>
                                {/* {user.imgUrl && <img src={user.imgUrl} />} */}{' '}
                                <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" />
                                <div>
                                    <span className="text first">{user.fullname}</span>
                                </div>
                                <button>...</button>
                            </NavLink>
        </header>
        <div>
        <img src="https://via.placeholder.com/300x500" alt="Post 1" />
        </div>

        {/* <p>Speed: <span>{entry.speed.toLocaleString()} Km/h</span></p>
        {entry.owner && <p>Owner: <span>{entry.owner.fullname}</span></p>} */}
        
    </article>
}