import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import { selectLoggedIn } from '../../state/authSlice';

export const AddServer = ({ show, setShow }) => {
  const authenticated = useSelector(selectLoggedIn);
  const [error, setError] = useState();

  if (!authenticated) return <Redirect to="/admin" />;

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Server</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};
