import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './admin/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin">
          <Login />
        </Route>

        <Route exact path="/">
          <div>home</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
