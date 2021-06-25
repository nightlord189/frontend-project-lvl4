import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../../../context';
import { renameChannel } from '../../../store/channels.js';
import { closeModal } from '../../../store/modal';

const RenameChannelModal = ({ show, channel }) => {
  const { t } = useTranslation();

  const [channelName, setChannelName] = useState(channel ? channel.name : '');
  const [inputValue, setInputValue] = useState('');
  const [formState, setFormState] = useState({
    state: 'editing',
    error: '',
  });

  if (channel !== null && channelName !== channel.name) {
    setChannelName(channel.name);
    setInputValue(channel.name);
  }

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { channels } = useSelector((state) => state.channels);

  const getErrorText = (key) => t(`channels.${key}`);

  const handleChangeName = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.state !== 'editing') {
      return;
    }
    if (channels.filter((x) => x.name === inputValue).length > 0) {
      setFormState({
        state: 'editing',
        error: 'errorUnique',
      });
      return;
    }
    // console.log(`submit add channel ${name}`);
    setFormState({
      state: 'sending',
      error: '',
    });
    socket.emit('renameChannel', { id: channel.id, name: inputValue }, (response) => {
      if (response.status === 'ok') {
        dispatch(renameChannel({
          ...channel,
          name: inputValue,
        }));
        setFormState({
          state: 'editing',
          error: '',
        });
        dispatch(closeModal());
      } else {
        setFormState({
          state: 'editing',
          error: 'errorNetwork',
        });
      }
      // console.log(response.status); // ok
    });
  };

  const handleHide = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              minLength="3"
              maxLength="20"
              className="mb-2"
              name="name"
              data-testid="rename-channel"
              required
              value={inputValue}
              onChange={handleChangeName}
              ref={inputRef}
              isInvalid={formState.error !== ''}
            />
            <Form.Control.Feedback type="invalid">{getErrorText(formState.error)}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                className="me-2"
                variant="secondary"
                onClick={handleHide}
              >
                {t('channels.cancel')}
              </Button>
              <Button type="submit">{t('channels.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
