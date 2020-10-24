import React, { useState } from "react";
import "./Message.css";
import Dropdown from "react-bootstrap/Dropdown";
import MessageToggle from "./MessageToggle";
import DeleteModal from '../DeleteModal/DeleteModal';

const Messaege = ({ user, message, index, deleteMessage }) => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const changeView = () => {
    setShowDeleteModal(!showDeleteModal);
  }

    let activeClass = ''
    if(message.info)activeClass = (message.info.sender === user.name || message.info.sender=='bot') ? "" : "active-message ";

  return (
    <div className={activeClass + "message-box"}>
      <Dropdown>
        <Dropdown.Toggle as={MessageToggle} />
        <Dropdown.Menu size="sm">
          {message.info.sender !== user.name && <Dropdown.Item>Edit</Dropdown.Item> }
          <Dropdown.Item onClick={changeView}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <p className="message-content">{message.text}</p>
      <span className="message-time">{message.info.time}</span>
      { showDeleteModal && <DeleteModal message={message} index={index} deleteMessage={deleteMessage}/> }
    </div>
  );
};

export default Messaege;
