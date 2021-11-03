import './rightbar.css'
import { Users } from '../../dummyData'
import Online from './online/Online'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth/AuthContext'
import { Add, Remove } from '@mui/icons-material'
import { Follow, Unfollow } from '../../contexts/auth/auth.actions'
const Rightbar = ({ user }) => {
  const HomeRightBar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + 'gift.png'} alt="" />
          <span className="birthdayText">
            <b> Mohamed Diémé</b> and <b>3 other friends</b> have a birthday
            today.
          </span>
        </div>
        <img src={PF + 'ad.png'} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    const [friends, setFriends] = useState([])
    const { user: currentUser, dispatch } = useContext(AuthContext)
    const [followed, setFollowed] = useState(false)

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const API_URL = process.env.REACT_APP_API

    const fetchFriends = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/friends/${user._id}`)

        setFriends(data)
      } catch (error) {}
    }

    const followHandler = async () => {
      try {
        if (followed) {
          await axios.put(API_URL + '/users/' + user._id + '/unfollow', {
            userId: currentUser._id,
          })
          console.log('userid unflo ', user._id)
          dispatch(Unfollow(user._id))
        } else {
          await axios.put(API_URL + '/users/' + user._id + '/follow', {
            userId: currentUser._id,
          })
          console.log('userid folllow ', user._id)
          dispatch(Follow(user._id))
        }
      } catch (error) {}
    }

    useEffect(() => {
      fetchFriends()
    }, [user._id])

    useEffect(() => {
      setFollowed(currentUser.followings.includes(user?._id))
      console.log(followed)
      console.log(currentUser.followings)
    }, [currentUser.followings, user?.id])

    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButon" onClick={followHandler}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationships:</span>
            <span className="rightbarInfoValue">
              {user.relationships === 1
                ? 'Single'
                : user.relationships === 2
                ? 'Married'
                : '-'}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((f) => (
            <Link
              style={{ textDecoration: 'none' }}
              to={'/profile/' + f.username}
              key={f._id}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    f.profilePicture
                      ? PF + f.profilePicture
                      : PF + 'person/noAvatar.png'
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{f.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightBar />}
      </div>
    </div>
  )
}

export default Rightbar
