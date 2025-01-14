// import React, { useState } from 'react'
// import { entrySvg } from '../Svgs'

// export function LikeButtom() {
//     const [likes, setLikes] = useState(0)
//     const [liked, setLiked] = useState(false)

//     const handleLike = () => {
//         setLiked(!liked)
//         setLikes(liked ? likes - 1 : likes + 1)
//     }
//     const heartIcon = React.cloneElement(entrySvg.heart, {
//         fill: liked ? 'red' : 'none', 
//         stroke: liked ? 'red' : 'black', 
//     })

//     return (
//         <div>
//            <button onClick={handleLike}>{heartIcon}</button> 
//            <p>{likes} Likes</p>
//         </div>
//     )
// }
