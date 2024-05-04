import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, toggleIsLike, deleteComment} = props

  const {id, nameInput, commentInput, date, isLiked, initialClassName} =
    commentDetails

  const commentPostedTime = formatDistanceToNow(date)

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeText = isLiked ? 'liked' : ''

  const onClickLikeIcon = () => {
    toggleIsLike(id)
  }
  const onDeleteComment = () => {
    deleteComment(id)
  }

  return (
    <li>
      <div className="comment-user-container">
        <div className={initialClassName}>
          <h1 className="user-initial">{nameInput[0]}</h1>
        </div>

        <h1 className="user-name">{nameInput}</h1>
        <p className="comment-time">{commentPostedTime}</p>
      </div>
      <p className="comment">{commentInput}</p>
      <div className="like-delete-container">
        <div className="like-container">
          <button className="like-btn" onClick={onClickLikeIcon}>
            <img src={likeImgUrl} alt="like" className="like-img" />
          </button>
          <p className={`like-text ${likeText}`}>Like</p>
        </div>
        <button
          className="delete-btn"
          data-testid="delete"
          type="button"
          onClick={onDeleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
