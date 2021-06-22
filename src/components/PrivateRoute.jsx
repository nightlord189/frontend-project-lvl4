import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const PrivateRoute = ({
  children, path, exact, redirect, redirectPath,
}) => (
  <Route
    path={path}
    exact={exact}
    render={({ location }) => (redirect ? (
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
export default PrivateRoute;
