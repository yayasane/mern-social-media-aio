import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './conversation.css'

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const friendId = conversation.members.find((m) => m !== currentUser._id)
  const API_URL = process.env.REACT_APP_API
  const fetchFriend = async (friendId) => {
    try {
      const { data } = await axios.get(`${API_URL}/users?userId=${friendId}`)
      console.log(data)
      setUser(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchFriend(friendId)
  }, [])

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? PF + user?.profilePicture
            : PF + 'person/noAvatar.png'
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation
