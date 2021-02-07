import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './admin/Login';
import AdminNavigation from './admin/AdminNavbar';
import AdminPanel from './admin/AdminPanel';

import { Servers } from './server-list/servers';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin/panel">
          <AdminNavigation />
          <AdminPanel />
        </Route>

        <Route exact path="/admin">
          <AdminNavigation />
          <Login />
        </Route>

        <Route exact path="/:ip">
          <div></div>
        </Route>

        <Route exact path="/">
          <Servers />
        </Route>

        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
