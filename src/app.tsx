import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/index';
import Login from './pages/Login/index';
import Regist from './pages/Regist/index';
import DownloadRank from './pages/DownloadRank/index';
import HotRank from './pages/HotRank/index';
import Setting from './pages/Setting/index';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/regist" component={Regist} />
        <Route path="/downloadRank" component={DownloadRank} />
        <Route path="/hotRank" component={HotRank} />
        <Route path="/setting" component={Setting} />
      </Switch>
    </Router>
  )
}

ReactDom.render(<App />, document.getElementById('root'));