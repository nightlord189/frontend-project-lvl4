import React, { useState } from 'react';
import { AuthContext } from '../context';

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('user'));

  const login = (data) => {
    const stringified = JSON.stringify(data);
    localStorage.setItem('user', stringified);
    setAuth(stringified);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuth(null);
  };

  const getUser = () => auth;

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      getUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
