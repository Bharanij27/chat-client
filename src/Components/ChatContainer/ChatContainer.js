import React, { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import callAPI from "../../common/callAPI";
import ChatBox from "../ChatBox/ChatBox";
import ChatFriends from "../ChatFriends/ChatFriends";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatMakeRequest from "../ChatMakeRequest/ChatMakeRequest";
import ChatRequests from "../ChatRequests/ChatRequests";
import ChatUsersBody from "../ChatUsersBody/ChatUsersBody";
import io from "socket.io-client";
import Loading from "../Loading/Loading";

const ChatLeftPannel = () => {
  const [currentBody, setCurrentBody] = useState("User");
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [chatFriend, setFriends] = useState([]);
  const [updateBody, setUpdateBody] = useState('');
  const [cookies] = useCookies(["user"]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let socket = io("https://capstone-chat-server.herokuapp.com/");

    socket.emit("join common", {token: cookies.user.token}, (error) => {
      if (error) {
        alert(error);
      }
    });
    socket.on("recieved common Message", ({ recMesg, sender, sendByMe }) => {
      setUpdateBody(Math.random().toString(36).substring(2, 8))
    });
  }, []);

  useEffect(() => {
    const fetChData = async () => {
      setIsLoading(true)
      let apiResult = await callAPI("https://capstone-chat-server.herokuapp.com/users/", {
        token: cookies.user.token,
      }, 'POST');
      setUserDetails(apiResult);
      setIsLoading(false)
    };

    fetChData();
  }, [currentUser, currentBody, updateBody]);

  useEffect(() => {
    if (userDetails.friends) {
      let users = userDetails.friends.filter((friend) => friend.lastMessage !== null);
      users.sort((a, b) => b.lastMesgTime - a.lastMesgTime);
      setFriends(users);
    }
  }, [userDetails, currentBody,]);

  const chatWithUser = (user) => {
    setCurrentBody(null);
    setCurrentUser(user);
  };

  return (
    <Fragment>
      {isLoading && <Loading/>}
      {currentBody !== null ? (
        <Fragment>
          <ChatHeader
            currentBody={currentBody}
            setCurrentBody={setCurrentBody}
          />

          {currentBody === "User" ? (
            <ChatUsersBody chatWithUser={chatWithUser} friends={chatFriend} setUpdateBody={setUpdateBody}/>
          ) : currentBody === "Friend" ? (
            <ChatFriends cookies={cookies} chatWithUser={chatWithUser} />
          ) : currentBody === "Request" ? (
            <ChatRequests cookies={cookies}/>
          ) : currentBody === "MakeRequest" ? (
            <ChatMakeRequest cookies={cookies}/>
          ) : null}
        </Fragment>
      ) : (
        <ChatBox cookies={cookies} user={currentUser} setCurrentBody={setCurrentBody} />
      )}
    </Fragment>
  );
};

export default ChatLeftPannel;
