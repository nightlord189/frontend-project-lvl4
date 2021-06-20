import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import NotFound from './NotFound.jsx';
import Chat from './chat/Chat.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Navbar from './Navbar.jsx';

const App = () => {
  const isAuthorized = localStorage.getItem('user') !== null;

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" flag={isAuthorized} redirectPath="/login">
            <Chat />
          </PrivateRoute>
          <PrivateRoute path="/login" flag={!isAuthorized} redirectPath="/">
            <Login />
          </PrivateRoute>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
