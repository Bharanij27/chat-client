import React, { Fragment } from "react";
import logo from "../../chatLogo.png";
import HeaderMenu from "../HeaderMenu/headerMenu";
import "./ChatHeader.css";

const ChatHeader = ({ currentBody, setCurrentBody }) => {
  return (
    <div className="left-panel-head card-chat-head">
      <div className="left-side-head">
        {currentBody === "User" ? (
          <Fragment>
            <img src={logo} className="left-icon" />
            <span className="app-title">Let'zChat</span>
          </Fragment>
        ) : (
          <Fragment>
          <i className="fa fa-lg fa-arrow-left m-3 cursor" onClick={() => setCurrentBody('User')}></i>
          <span className="app-title">Let'zChat</span>
          </Fragment>
        )}
      </div>
      <div className="Logout m-1">
        <HeaderMenu setCurrentBody={setCurrentBody} />
      </div>
    </div>
  );
};

export default ChatHeader;
