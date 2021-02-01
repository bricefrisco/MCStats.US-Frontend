import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './admin/Login';
import AdminNavigation from './admin/AdminNavbar';
import AdminPanel from './admin/AdminPanel';

import { Servers } from './server-list/servers';
import { Navigation } from './shared/navbar';

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

        <Route exact path="/">
          <Navigation />
          <Servers />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
