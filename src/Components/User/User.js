import React from "react";
import userIcon from "../../user_icon.png";
import "./User.css";
import messageIcon from '../../comment.png'

const User = ({ user, chatWithUser }) => {

  return (
    <div className="user">
      <div className="user-icon">
        <img src={userIcon} alt="icon" />
      </div>
      <div className="user-name" onClick={() => chatWithUser(user)}>
        <h2>{user.name}</h2>
        <p>{user.lastMessage}</p>
      </div>
      {user.lastMessage !== user.lastMessageRead && (
        <div className="unread-mesg">
          <img src={messageIcon} alt="icon"/>
        </div>
        )
      }
    </div>
  );
};

export default User;
