import React from 'react';

const Chat = () => {
  const authToken = localStorage.getItem('userToken');
  if (!authToken) {
    window.location.href = '/login';
  }
  return (
    <div><h1>Chat</h1></div>
  );
};

export default Chat;
