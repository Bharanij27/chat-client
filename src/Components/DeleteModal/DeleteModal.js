import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteModal = ({ message, index, deleteMessage }) => {
    console.log(message);
    const [show, setShow] = useState(true);

  const handleClose = () => {
      setShow(false);
      deleteMessage(index);
    }

    return(
        <Modal aria-labelledby="contained-modal-title-vcenter"
        centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Want to delete...</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Yes
          </Button>
        </Modal.Footer> 
      </Modal>
    )
}

export default DeleteModal;