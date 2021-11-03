import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from '@mui/icons-material'
import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../../contexts/auth/AuthContext'
import './share.css'

const Share = () => {
  const { user } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const API_URL = process.env.REACT_APP_API
  const desc = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(API_URL)
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }
    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      //l'ordre dans lequel les champs et les fichiers sont transfmis à formData est important.
      //Sur nodeJS avec multer si on veut que le nom du fichier sur prérempli dans le req.body.name, au niveau callback de l'attribut filename des options passer au diskStorage. On ajoute en premier name dans formData
      data.append('name', fileName)
      data.append('file', file)
      newPost.img = fileName
      console.log(data)

      try {
        await axios.post(`${API_URL}/upload`, data)
        window.location.reload()
      } catch (error) {}
    }

    try {
      await axios.post(`${API_URL}/posts`, newPost)
    } catch (error) {}
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + 'person/noAvatar.png'
            }
            alt=""
          />
          <input
            className="shareInput"
            placeholder={"What's in your mind " + user.username + '?'}
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: 'none' }}
                type="file"
                accept=".png,.jpeg,.jpg"
                id="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  )
}

export default Share
