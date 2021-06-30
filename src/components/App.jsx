import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import NotFound from './NotFound.jsx';
import Chat from './chat/Chat.jsx';
import Navbar from './Navbar.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import { AuthContext } from '../context.js';

const App = () => {
  const auth = useContext(AuthContext);

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" redirect={auth.getUser()} redirectPath="/login">
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
  );
};

export default App;
