// @ts-check

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App.jsx';
import store from './store/store.js';
import { SocketContext } from './hooks.js';

export default () => {
  const socket = io();

  ReactDOM.render(
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketContext.Provider>,
    document.getElementById('chat'),
  );
};
