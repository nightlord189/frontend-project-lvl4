import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const PrivateRoute = ({
  children, path, exact, flag, redirectPath,
}) => {
  console.log(`PrivateRoute, path: ${path}, flag: ${flag}, redirectPath: ${redirectPath}`);
  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => (flag ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: redirectPath,
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

export default PrivateRoute;
