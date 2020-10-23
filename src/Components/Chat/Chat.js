import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import ChatContainer from "../ChatContainer/ChatContainer";
import "./Chat.css";

const Chat = () => {
  const [cookies] = useCookies(["user"]);
  const history = useHistory();

  useEffect(() => {
    if (!cookies.user || !cookies.user.token) {
      history.push("/");
    }
  });

  return (
    <div className="chat-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className={"card ml-5 mr-5 mt-3 border-yellow"}>
              <ChatContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
