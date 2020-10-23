import React from "react";
import userIcon from "../../user_icon.png";
import "../Friends/Friends.css";

const AllFriends = ({ user, children, chatWithUser}) => {
  return (
    <div className="all user">
      <div className="user-icon">
        <img src={userIcon} alt="icon" />
      </div>
      <div className="friend-name" onClick={() => chatWithUser(user)}>
        <h2>{user.name}</h2>
      </div>
      {children}
    </div>
  );
};

export default AllFriends;
