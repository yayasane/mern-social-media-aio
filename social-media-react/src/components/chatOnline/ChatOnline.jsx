import axios from 'axios'
import { useEffect, useState } from 'react'
import './chatonline.css'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const API_URL = process.env.REACT_APP_API
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const fetchFriends = async (userId) => {
    const { data } = await axios.get(`${API_URL}/users/friends/${userId}`)
    setFriends(data)
  }

  const fetchConversation = async (user) => {
    console.log(user)
    const { data } = await axios.get(
      `${API_URL}/conversations/find/${currentId}/${user._id}`,
    )

    setCurrentChat(data)
  }

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
  }, [friends, onlineUsers])

  useEffect(() => {
    fetchFriends(currentId)
  }, [currentId])
  console.log(friends)
  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          key={o._id}
          className="chatOnlineFriend"
          onClick={() => fetchConversation(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o.profilePicture
                  ? PF + o.profilePicture
                  : PF + 'person/noAvatar.png'
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline
