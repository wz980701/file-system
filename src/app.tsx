import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/index';
import Login from './pages/Login/index';
import Regist from './pages/Regist/index';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/regist" component={Regist} />
      </Switch>
    </Router>
  )
}

ReactDom.render(<App />, document.getElementById('root'));