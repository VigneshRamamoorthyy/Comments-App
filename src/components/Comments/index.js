import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentList = []

class Comments extends Component {
  state = {
    commentsList: initialCommentList,
    nameInput: '',
    commentInput: '',
  }

  onAddComment = event => {
    event.preventDefault()
    console.log('Form submitted!')
    const {nameInput, commentInput} = this.state
    console.log(nameInput)
    console.log(commentInput)
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      nameInput: nameInput,
      commentInput: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
    })
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="comment-img-container">
            <div className="comment-container">
              <h1 className="title">Comments</h1>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="comments-img"
              />
              <p className="description">
                Say something about 4.0 Technologies
              </p>

              <form
                className="comment-form-container"
                onSubmit={this.onAddComment}
              >
                <input
                  type="text"
                  className="name-input"
                  placeholder="Your Name"
                  onChange={this.onChangeName}
                  value={nameInput}
                />
                <textarea
                  className="comments-input"
                  placeholder=" Your Comment"
                  onChange={this.onChangeComment}
                  value={commentInput}
                  rows="6"
                />
                <button type="submit" className="button">
                  Add Comment
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-img-lg"
            />
          </div>
          <hr className="seperator" />
          <div className="comment-count-container">
            <p className="comments-count">{commentsList.length}</p>
            <p className="comments-text">Comments</p>
          </div>
          <ul className="comments-list">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsLike={this.toggleIsLike}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
