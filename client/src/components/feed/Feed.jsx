import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth/AuthContext'
import './feed.css'
import Post from './post/Post'
import Share from './share/Share'
const Feed = ({ username }) => {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)
  const API_URL = process.env.REACT_APP_API

  const fetchTimelinePosts = async (userId) => {
    // console.log(process.env.REACT_APP_API)
    const { data } = await axios.get(`${API_URL}/posts/timeline/${user._id}`)
    setPosts(
      data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }),
    )
  }
  const fetchUserPosts = async (username) => {
    console.log(username)
    const { data } = await axios.get(`${API_URL}/posts/profile/${username}`)
    setPosts(
      data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }),
    )
  }

  useEffect(() => {
    if (username) {
      fetchUserPosts(username)
    } else {
      fetchTimelinePosts(user._id)
    }
  }, [username, user._id, API_URL])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed
