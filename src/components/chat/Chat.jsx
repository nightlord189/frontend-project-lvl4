import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import routes from '../../routes.js';
import { updateChannels } from '../../store/channels.js';
import { updateMessages } from '../../store/messages.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import Modal from './modals/Modal.jsx';
import { AuthContext } from '../../context.js';

const Chat = () => {
  const user = localStorage.getItem('user');
  const userParsed = JSON.parse(user);
  const auth = useContext(AuthContext);
  const history = useHistory();

  const dispatch = useDispatch();

  const getData = async () => {
    // console.log('getData in chat');
    try {
      const response = await axios.get(routes.getDataPath,
        {
          headers: { Authorization: `Bearer ${userParsed.token}` },
        });
      // console.log(response.data);
      dispatch(updateChannels({
        channels: response.data.channels,
        currentChannelId: response.data.currentChannelId,
      }));
      dispatch(updateMessages(response.data.messages));
    } catch (error) {
      // console.log(`data failure: ${error}, status: ${error.response.status}, logout`);
      auth.logout();
      history.replace('/login');
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <div className="row h-100 bg-white">
      <Channels />
      <Messages />
      <Modal />
    </div>
  );
};

export default Chat;
