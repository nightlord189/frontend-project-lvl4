import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import { SocketContext } from '../../hooks.js';

const MessageForm = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState('');
  const [inputEnabled, setInputEnabled] = useState(true);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const socket = useContext(SocketContext);

  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');
    const { username } = JSON.parse(localStorage.getItem('user'));
    const msg = {
      username,
      message: value,
      channelId: currentChannelId,
    };
    socket.emit('newMessage', msg, (response) => {
      if (response.status === 'ok') {
        setValue('');
      }
      setInputEnabled(true);
      inputRef.current.focus();
      console.log(response.status); // ok
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <div className="border-top mt-auto py-3 px-5">
      <form noValidate="" className="" onSubmit={handleSubmit}>
        <div className="input-group">
          <Form.Control
            ref={inputRef}
            type="text"
            name="body"
            value={value}
            onChange={handleChange}
            disabled={!inputEnabled}
            required
            data-testid="new-message"
            className="border-0 form-control"
            placeholder={t('messages.enterMessage')}
            autoFocus
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="30" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
