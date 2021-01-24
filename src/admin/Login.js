import React, { useState } from 'react';
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

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loggedIn = useSelector(selectLoggedIn);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  if (loggedIn) return <Redirect to="/admin/panel" />;

  return (
    <>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => dispatch(login(email, password))}>Log In</button>

      {loading && <span>{loading}</span>}
      {error && <span>{error}</span>}
    </>
  );
};

export default Login;
