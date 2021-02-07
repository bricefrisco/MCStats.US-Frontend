import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  login,
  selectLoggedIn,
  selectLoading,
  selectError,
} from '../state/authSlice';

export const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loggedIn = useSelector(selectLoggedIn);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  if (loggedIn) return <Redirect to="/server-list" />;

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={12} lg={8} className="mx-auto pt-5">
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              disabled={loading}
              variant="primary"
              type="submit"
              className="w-100 mt-2"
            >
              Login
            </Button>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
