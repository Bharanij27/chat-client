import React from "react";
import userIcon from "../../user_icon.png";
import './ChatBoxHeader.css';

const ChatBoxHeader = ({ user, setCurrentBody, status }) => {
  let statusClass = status === 'Online'? 'active-user' : 'inactive-user'
  return (
    <div className="chat_header">
      <div className="user-icon">
        <img src={userIcon} alt="icon" />
      </div>
      <div className="chat_headerInfo">
        <h5>{user.name}</h5>
        <p className={statusClass}>{status}</p>
      </div>
        <i className="fa fa-lg fa-arrow-left m-3 cursor" style={{display:'right'}} onClick={() => setCurrentBody('User')}></i>
    </div>
  );
};

export default ChatBoxHeader;
