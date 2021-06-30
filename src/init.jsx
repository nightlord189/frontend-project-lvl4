// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import App from './components/App.jsx';
import store from './store/store.js';
import { SocketContext, RollbarContext } from './context.js';
import { addMessage } from './store/messages.js';
import { addChannel, removeChannel, renameChannel } from './store/channels.js';
import AuthProvider from './components/AuthProvider.jsx';

import translationRu from './locales/ru.json';

const init = async (socketClient, rollbarInstance) => {
  const i18nInstance = i18n.createInstance();

  await i18nInstance
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
      <I18nextProvider i18n={i18nInstance}>
        <SocketContext.Provider value={socket}>
          <AuthProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </AuthProvider>
        </SocketContext.Provider>
      </I18nextProvider>
    </RollbarContext.Provider>
  );
};

export default init;
