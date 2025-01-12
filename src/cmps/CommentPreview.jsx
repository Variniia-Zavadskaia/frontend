import { Link } from 'react-router-dom'

export function CommentPreview({ comment }) {
    const { byUser, aboutUser } = comment

    return <article className="preview comment-preview">
        <p>About: <Link to={`/user/${aboutUser._id}`}>{aboutUser.fullname}</Link></p>
        <p className="comment-by">By: <Link to={`/user/${byUser._id}`}>{byUser.fullname}</Link></p>
        <p className="comment-txt">{comment.txt}</p>
    </article>
}