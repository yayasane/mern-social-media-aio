import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TopBar from '../../components/topbar/Topbar'
import './profile.css'
const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})
  const username = useParams().username

  const fetchUser = async (username) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/users?username=${username}`,
    )
    setUser(data)
  }

  useEffect(() => {
    fetchUser(username)
  }, [username])
  return (
    <>
      <TopBar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + 'person/noCover.png'
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/noAvatar.png'
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
