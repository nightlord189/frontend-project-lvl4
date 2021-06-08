import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">Hexlet Chat</Link>
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <div><h1>Index</h1></div>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
