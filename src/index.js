// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { render } from 'react-dom';
import Rollbar from 'rollbar';
import { io } from 'socket.io-client';

import '../assets/application.scss';

import init from './init.jsx';

const ROLLBAR_TOKEN = 'abe8f1de81b94a739d51c14cdcf0532d';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

const rollbarInstance = new Rollbar({
  accessToken: ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
});

init(socket, rollbarInstance).then((vdom) => {
  render(vdom, document.getElementById('chat'));
});
