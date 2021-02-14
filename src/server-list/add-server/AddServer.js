import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Modal, Button, Form, Alert} from 'react-bootstrap';

import {selectLoggedIn, refresh, selectJwt} from '../../state/authSlice';
import {parseResponse} from '../../utils/api';

export const AddServer = ({show, setShow}) => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectLoggedIn);
  const jwt = useSelector(selectJwt);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  const [serverName, setServerName] = useState('');
  const [serverIp, setServerIp] = useState('');

  if (!authenticated) return <Redirect to="/admin"/>;

  const addServer = (jwt) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND}/servers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      },
      body: JSON.stringify({
        name: serverName,
        address: serverIp,
      }),
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
        } else if (err.toString().includes('Token')) {
          dispatch(refresh((jwt) => addServer(jwt)));
        } else {
          setSuccess(undefined);
          setLoading(false);
          setError(err.toString());
        }
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addServer(jwt);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Server</Modal.Title>
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
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mt-3">
            {success}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading || success} onClick={onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
