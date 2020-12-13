import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Recuperar from '../pages/Recuperar';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/recuperar" component={Recuperar}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;