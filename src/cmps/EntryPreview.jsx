// import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { entrySvg } from './Svgs'

export function EntryPreview({ entry }) {
    const user = useSelector(storeState => storeState.userModule.user)
    
    return (
        <article className="preview">
            <header>
                <NavLink className="menu-item" to={`user/${user._id}`}>
                    {/* {user.imgUrl && <img src={user.imgUrl} />} */}{' '}
                    <img src="src/assets/icons/user.svg" alt="user Icon" className="icon regular" />
                    <div>
                        <span className="text first">{user.fullname}</span>
                    </div>
                    <button>{entrySvg.option}</button>
                </NavLink>
            </header>
            <div>
                <img src=" https://picsum.photos/300/300" alt="Post 1" />
            </div>

            {/* <p>Speed: <span>{entry.speed.toLocaleString()} Km/h</span></p>
        {entry.owner && <p>Owner: <span>{entry.owner.fullname}</span></p>} */}
        </article>
    )
}
