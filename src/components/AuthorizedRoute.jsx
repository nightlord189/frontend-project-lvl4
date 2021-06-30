import React, { useContext } from 'react';
import PrivateRoute from './PrivateRoute.jsx';
import { AuthContext } from '../context';

const AuthorizedRoute = ({
  children, path, exact, redirectPath,
}) => {
  const auth = useContext(AuthContext);

  return (
    <PrivateRoute exact={exact} path={path} redirect={auth.getUser()} redirectPath={redirectPath}>
      {children}
    </PrivateRoute>
  );
};

export default AuthorizedRoute;
