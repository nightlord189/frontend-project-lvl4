import React, { useState } from 'react';
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
import { AuthContext } from '../context';

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem('user'));
  const isAuthorized = auth !== null;
  console.log(`rendering app, auth: ${auth}, isAuthorized: ${isAuthorized}`);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/" flag={isAuthorized} redirectPath="/login">
              <Chat />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
