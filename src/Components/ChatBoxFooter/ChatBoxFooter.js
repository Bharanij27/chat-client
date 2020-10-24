import React, { useState } from "react";
import "./ChatBoxFooter.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import sendButton from '../../send.png'

const ChatBoxFooter = ({ setChatheight, sendMessage }) => {
  const [value, setValue] = useState("");
  const [usingEmoji, setUsingEmoji] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleEmoji = (e) => {
    if (usingEmoji) setChatheight(60);
    else setChatheight(40);
    setUsingEmoji(!usingEmoji);
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setValue(value + emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(value);
    setValue('');
  };

  return (
    <div className="chat-footer">
      <span className="emoji-picker">
        <Picker
          set="facebook"
          style={{ width: "100%", display: !usingEmoji ? "none" : "block" }}
          onSelect={(e) => addEmoji(e)}
        />
      </span>
      <i className="fa fa-smile-o fa-lg m-2 cursor" onClick={handleEmoji}></i>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e)}
          placeholder="Type a message then hit ENTER"
        />
        <button type="submit">
        <img src={sendButton} alt="send"/>
        </button>
      </form>
    </div>
  );
};

export default ChatBoxFooter;
