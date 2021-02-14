import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Login from './admin/Login';

import {Server} from './server';
import {ServerList} from './server-list';
import {Header} from './shared/header';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin">
          <Header/>
          <Login/>
        </Route>

        <Route exact path="/servers/:serverName">
          <Header/>
          <Server/>
        </Route>

        <Route exact path="/server-list/:page">
          <Header/>
          <ServerList/>
        </Route>

        <Route path="/" children={<Redirect to="/server-list/1"/>}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
