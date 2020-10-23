import React, { Fragment, useEffect, useState } from "react";
import ChatBoxBody from "../ChatBoxBody/ChatBoxBody";
import ChatBoxFooter from "../ChatBoxFooter/ChatBoxFooter";
import ChatBoxHeader from "../ChatBoxHeader/ChatBoxHeader";
import "./ChatBox.css";
import callAPI from "../../common/callAPI";
import io from "socket.io-client";
import Loading from "../Loading/Loading";

var socket;
const ChatBox = ({ user, setCurrentBody, cookies }) => {
  const [messages, setMessages] = useState([]);
  const [chatheight, setChatheight] = useState(60);
  const [status, setStatus] = useState('Offline');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      let apiResult = await callAPI(
        "https://capstone-chat-server.herokuapp.com/messages",
        { token: cookies.user.token, friend: user.name },
        "POST"
      );
      setMessages(apiResult.messages);
      setIsLoading(false)
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
          console.log('recieved message', recMesg);
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
      {isLoading && <Loading/>}
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
