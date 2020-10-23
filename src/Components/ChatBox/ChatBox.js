import React, { Fragment, useEffect, useState } from "react";
import ChatBoxBody from "../ChatBoxBody/ChatBoxBody";
import ChatBoxFooter from "../ChatBoxFooter/ChatBoxFooter";
import ChatBoxHeader from "../ChatBoxHeader/ChatBoxHeader";
import "./ChatBox.css";
import callAPI from "../../common/callAPI";
import io from "socket.io-client";

var socket;
const ChatBox = ({ user, setCurrentBody, cookies }) => {
  const [messages, setMessages] = useState([]);
  const [chatheight, setChatheight] = useState(60);
  const [status, setStatus] = useState('Offline');

  useEffect(()=>{
    console.log(messages);
  },[messages])

  useEffect(() => {
    const fetchData = async () => {
      let apiResult = await callAPI(
        "https://capstone-chat-server.herokuapp.com/messages",
        { token: cookies.user.token, friend: user.name },
        "POST"
      );
      console.log(apiResult);
      setMessages(apiResult.messages);
    };

    fetchData();
  }, []);

  useEffect(() => {
    socket = io("https://capstone-chat-server.herokuapp.com/");

    socket.emit("join", {token: cookies.user.token, friend: user.name}, (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on('friendStatus', ({ friendStatus }) => {
      if(friendStatus) setStatus('Online');
      else setStatus('Offline');
    })

    socket.on("recieved Message", ({ recMesg, sender, sendByMe }) => {
      if(sender === user.name || sendByMe) {
          setMessages([...recMesg]);
          if(!sendByMe){
            let lastMessage = recMesg[recMesg.length - 1];
            socket.emit('updateLastMessage', {token: cookies.user.token, user: user.name, mesg : lastMessage})
          }
        }
    });
  }, []);

  const sendMessage = (mesg) => {
    if (mesg.trim().length) {
      let friend = user.name;
      let token = cookies.user.token;
      socket.emit("sendMessage", { mesg, friend, token });
    }
  };

  return (
    <Fragment>
      <div className="chat">
        <ChatBoxHeader user={user} status={status} setCurrentBody={setCurrentBody} />
          <ChatBoxBody
            user={user}
            cookies={cookies}
            messages={messages}
            chatheight={chatheight}
            setMessages = {setMessages}
          />
        <ChatBoxFooter
          setChatheight={setChatheight}
          sendMessage={sendMessage}
        />
      </div>
    </Fragment>
  );
};

export default ChatBox;
