import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useHistory,
} from 'react-router-dom';

const Navbar = () => {
  const isAuthorized = localStorage.getItem('user') !== null;
  const { t } = useTranslation();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('user');
    history.replace('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/" className="navbar-brand">{t('title')}</Link>
        {isAuthorized && <button onClick={logout} type="button" className="btn btn-primary">{t('logout')}</button>}
      </div>
    </nav>
  );
};

export default Navbar;
