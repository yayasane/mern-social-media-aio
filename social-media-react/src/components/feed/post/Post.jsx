import { MoreVert } from '@mui/icons-material'
import './post.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/auth/AuthContext'
const Post = ({ post }) => {
  const [user, setUser] = useState({})
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const API_URL = process.env.REACT_APP_API
  const { user: currentUser } = useContext(AuthContext)

  const likeHandler = () => {
    try {
      axios.put(`${API_URL}/posts/${post._id}/like`, {
        userId: currentUser._id,
      })
    } catch (error) {}
    setLike((l) => (isLiked ? l - 1 : l + 1))
    setIsLiked((l) => !l)
  }

  const fetchUser = async (userId) => {
    const { data } = await axios.get(`${API_URL}/users?userId=${post.userId}`)
    setUser(data)
  }

  useEffect(() => {
    fetchUser(post.userId)
  }, [post.userId, API_URL])

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id])

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={'/profile/' + user.username}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/noAvatar.png'
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter"></div>
        <span className="postText">{post.desc}</span>
        <img className="postImg" src={PF + post.img} alt="" />
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PF + 'like.png'}
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={PF + 'heart.png'}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
