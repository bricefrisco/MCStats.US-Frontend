import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './admin/Login';

import { Server } from './server';
import { Servers } from './server-list/servers';
import { Header } from './shared/header';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin">
          <Header />
          <Login />
        </Route>

        <Route exact path="/servers/:serverName">
          <Header />
          <Server />
        </Route>

        <Route exact path="/server-list">
          <Header />
          <Servers />
        </Route>

        <Route path="/" children={<Redirect to="/server-list" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
