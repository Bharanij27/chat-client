import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteModal = ({ message, index, deleteMessage }) => {
    const [show, setShow] = useState(true);

  const handleClose = (decision) => {
      setShow(false);
      decision && deleteMessage(index);
    }

    return(
        <Modal aria-labelledby="contained-modal-title-vcenter"
        centered show={show} onHide={handleClose}>
        <Modal.Body>Want to delete "{message.text}" for you</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            No
          </Button>
          <Button variant="primary" onClick={() => handleClose(true)}>
            Yes
          </Button>
        </Modal.Footer> 
      </Modal>
    )
}

export default DeleteModal;