import React from "react";
import userIcon from "../../user_icon.png";
import "./Friends.css";

const Friends = ({ user, children}) => {
  return (
    <div className="user">
      <div className="user-icon">
        <img src={userIcon} alt="icon" />
      </div>
      <div className="friend-name">
        <h2>{user}</h2>
      </div>
      {children}
    </div>
  );
};

export default Friends;
