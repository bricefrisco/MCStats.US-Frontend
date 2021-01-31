import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { selectLoggedIn } from '../state/authSlice';

export const AdminPanel = () => {
  const loggedIn = useSelector(selectLoggedIn);

  if (!loggedIn) {
    return <Redirect to="/admin" />;
  }

  return <div>hi</div>;
};

export default AdminPanel;
