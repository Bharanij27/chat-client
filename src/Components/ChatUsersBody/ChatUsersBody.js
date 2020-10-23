import React, { useEffect, useState } from "react";
import User from "../User/User";
import "./ChatUsersBody.css";

const ChatUsersBody = ({ friends, chatWithUser, setUpdateBody }) => {

  return (
    <div className="user-list">
      {friends.map((user, idx) => {
        return <User key={idx} user={user} chatWithUser={chatWithUser} />;
      })}
    </div>
  );
};

export default ChatUsersBody;
