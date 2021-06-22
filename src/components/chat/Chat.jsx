/* eslint-disable functional/no-let */
import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import routes from '../../routes.js';
import { updateChannels } from '../../store/channels.js';
import { updateMessages } from '../../store/messages.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import { AuthContext } from '../../context.js';

const Chat = () => {
  const user = localStorage.getItem('user');
  const userParsed = JSON.parse(user);
  const [, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const dispatch = useDispatch();

  let isDataLoaded = false;

  const getData = async () => {
    // console.log('getData in chat');
    try {
      const response = await axios.get(routes.getDataPath,
        {
          headers: { Authorization: `Bearer ${userParsed.token}` },
        });
      // console.log(response.data);
      isDataLoaded = true;
      dispatch(updateChannels({
        channels: response.data.channels,
        currentChannelId: response.data.currentChannelId,
      }));
      dispatch(updateMessages(response.data.messages));
    } catch (error) {
      // console.log(`data failure: ${error}, status: ${error.response.status}, logout`);
      localStorage.removeItem('user');
      setAuth(null);
      history.replace('/login');
    }
  };

  useEffect(() => {
    getData();
  }, [isDataLoaded]);

  return (
    <div className="row h-100 bg-white">
      <Channels />
      <Messages />
    </div>
  );
};

export default Chat;
