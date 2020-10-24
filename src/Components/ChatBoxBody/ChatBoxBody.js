import React, { useEffect } from "react";
import "./ChatBoxBody.css";
import Message from "../Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";
const ChatBoxBody = ({ user, chatheight, messages =[], deleteMessage }) => {
  

  return (
    <ScrollToBottom className="chat_body" followButtonClassName="scroll-button">
    <div style={{ height: chatheight + "vh" }}>
      {messages.map((message, index) => {
        return <Message user={user} key={index} index={index} message={message} deleteMessage={deleteMessage}/>;
      })}
    </div>
    </ScrollToBottom>
  );
};

export default ChatBoxBody;
