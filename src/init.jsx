// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import Rollbar from 'rollbar';

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import App from './components/App.jsx';
import store from './store/store.js';
import { SocketContext, RollbarContext } from './context.js';
import { addMessage } from './store/messages.js';
import { addChannel, removeChannel, renameChannel } from './store/channels.js';

import translationRu from './locales/ru.json';

const ROLLBAR_TOKEN = 'abe8f1de81b94a739d51c14cdcf0532d';

const init = async (socketClient) => {
  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        ru: translationRu,
      },
      lng: 'ru',
      debug: false,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });
  // console.log(socketClient);
  const socket = socketClient !== undefined ? socketClient : io();

  const rollbarInstance = new Rollbar({
    accessToken: ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });

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

  return (
    <RollbarContext.Provider value={rollbarInstance}>
      <SocketContext.Provider value={socket}>
        <Provider store={store}>
          <App />
        </Provider>
      </SocketContext.Provider>
    </RollbarContext.Provider>
  );
};

export default init;
