import React, {useState} from 'react'
import {Alert, Button, Form, Modal} from "react-bootstrap";

import {parseResponse} from "../../utils";
import './add-server-request.css'

export const AddServerRequestButton = ({className, style}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(!show)} className={className} style={style}>Add a server</Button>
      <AddServerRequestModal
        show={show}
        setShow={() => setShow(!show)}
      />
    </>
  )
}

export const AddServerRequestModal = ({show, setShow}) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  const [serverName, setServerName] = useState('');
  const [serverIp, setServerIp] = useState('');

  const sendServerRequest = () => {
    setLoading(true);
    setError(undefined);
    fetch(`${process.env.REACT_APP_BACKEND}/new-server-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: serverName,
        address: serverIp
      })
    })
      .then(parseResponse)
      .then((response) => {
        setError(undefined);
        setLoading(false);
        setSuccess(response.message);
      })
      .catch((err) => {
        if (err === null || err === undefined) {
          setSuccess(undefined);
          setLoading(false);
          setError('Unknown error occurred');
        } else {
          setSuccess(undefined);
          setLoading(false);
          setError(err.toString());
        }
      });
  };

  const onHide = () => {
    setServerName('');
    setServerIp('');
    setError(undefined);
    setSuccess(undefined);
    setLoading(false);
    setShow();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    sendServerRequest();
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add a server</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Server Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Server Name"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Server IP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Server IP"
              value={serverIp}
              onChange={(e) => setServerIp(e.target.value)}
            />
          </Form.Group>
        </Form>

        {error && (
          <Alert variant='danger' className='mt-3'>
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant='success' className='mt-3'>
            {success}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading || success} onClick={onSubmit}>
          {(() => {
            if (loading) return 'Submitting...';
            if (success) return 'Submitted';
            return 'Submit'
          })()
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}