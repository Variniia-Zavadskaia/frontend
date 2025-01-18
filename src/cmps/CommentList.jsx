import { userService } from '../services/user'

import { CommentPreview } from './CommentPreview.jsx'

export function CommentList({ comments, onRemoveComment }) {
    return <section>
        <ul className="comment-list">
            {comments.map(comment =>
                <li key={comment.id}>
                    <CommentPreview comment={comment}/>
                </li>)
            }
        </ul>
    </section>
}