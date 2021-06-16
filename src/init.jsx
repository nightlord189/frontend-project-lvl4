// @ts-check

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App.jsx';
import store from './store/store.js';
import { SocketContext } from './hooks.js';
import { addMessage } from './store/messages.js';
import { addChannel, removeChannel, renameChannel } from './store/channels.js';

export default () => {
  const socket = io();

  socket.on('newMessage', (msg) => {
    store.dispatch(addMessage(msg));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
  });

  ReactDOM.render(
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketContext.Provider>,
    document.getElementById('chat'),
  );
};
