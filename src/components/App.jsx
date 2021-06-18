import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import NotFound from './NotFound.jsx';
import Chat from './chat/Chat.jsx';

const App = () => {
  const isAuthorized = localStorage.getItem('user') !== null;
  const { t } = useTranslation();

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Link to="/" className="navbar-brand">{t('title')}</Link>
            {isAuthorized && <button onClick={logout} type="button" className="btn btn-primary">{t('logout')}</button>}
          </div>
        </nav>
        <Switch>
          <Route exact path="/">
            <Chat />
          </Route>
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
