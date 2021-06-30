import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context';

const Navbar = () => {
  const isAuthorized = localStorage.getItem('user') !== null;
  const { t } = useTranslation();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logout = () => {
    auth.logout();
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
