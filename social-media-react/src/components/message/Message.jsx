import './message.css'
import { format } from 'timeago.js'
const Message = ({ message, own }) => {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={process.env.REACT_APP_PUBLIC_FOLDER + 'person/5.jpeg'}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
