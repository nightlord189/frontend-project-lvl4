import axios from 'axios';
import React, { useEffect } from 'react';

const Chat = () => {
  const authToken = localStorage.getItem('userToken');
  if (!authToken) {
    window.location.href = '/login';
  }

  const getData = async () => {
    const response = await axios.get('/api/v1/data',
      {
        headers: { Authorization: `Bearer ${authToken}` },
      });
    console.log(response.data);
  };

  useEffect(() => {
    getData();
  });

  return (
    <div><h1>Chat</h1></div>
  );
};

export default Chat;
