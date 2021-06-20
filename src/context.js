/* eslint-disable import/prefer-default-export */
import React from 'react';

export const SocketContext = React.createContext(null);
export const RollbarContext = React.createContext(null);
export const AuthContext = React.createContext({
  auth: null,
  setAuth: () => {},
});
