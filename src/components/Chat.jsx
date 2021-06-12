import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import routes from '../routes.js';
import { update } from '../store/channels.js';
import { updateMessages } from '../store/messages.js';

const Chat = () => {
  const authToken = localStorage.getItem('userToken');
  if (!authToken) {
    window.location.href = '/login';
  }

  const dispatch = useDispatch();

  const getData = async () => {
    const response = await axios.get(routes.getDataPath,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      });
    console.log(response.data);
    dispatch(update({
      channels: response.data.channels,
      currentChannelId: response.data.currentChannelId,
    }));
    dispatch(updateMessages(response.data.messages));
  };

  useEffect(() => {
    getData();
  });

  return (
    <div><h1>Chat</h1></div>
  );
};

export default Chat;
