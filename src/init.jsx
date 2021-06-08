// @ts-check

import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.jsx';

export default () => {
  ReactDOM.render(
    <App />,
    document.getElementById('chat'),
  );
};
