/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import MessageForm from './MessageForm.jsx';

const getChannelMessages = (messages, channelId) => {
  const result = messages.filter((x) => x.channelId === channelId);
  return result;
};

const Messages = () => {
  const { t } = useTranslation();

  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const allMessages = useSelector((state) => state.messages.messages);

  const currentChannelName = channels.length > 0 ? channels.filter((x) => x.id === currentChannelId)[0].name : '';
  const messages = getChannelMessages(allMessages, currentChannelId);

  useEffect(() => {
    animateScroll.scrollToBottom({
      duration: 0,
      delay: 0,
      containerId: 'messages-box',
    });
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {currentChannelName}</b>
          </p>
          <span className="text-muted">{t('messages.messagesCount')} {messages.length}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b> : {' '} {message.message}
            </div>
          ))}

        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default Messages;
