import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../../../context';
import { renameChannel } from '../../../store/channels.js';

const RenameChannelModal = (props) => {
  const { t } = useTranslation();

  const { onHide, channel } = props;
  const [name, setName] = useState(channel.name);
  const [formState, setFormState] = useState({
    state: 'editing',
    error: '',
  });
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { channels } = useSelector((state) => state.channels);

  const getErrorText = (key) => t(`channels.${key}`);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.state !== 'editing') {
      return;
    }
    if (channels.filter((x) => x.name === name).length > 0) {
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
    socket.emit('renameChannel', { id: channel.id, name }, (response) => {
      if (response.status === 'ok') {
        dispatch(renameChannel({
          ...channel,
          name,
        }));
        onHide();
      } else {
        setFormState({
          state: 'editing',
          error: 'errorNetwork',
        });
      }
      // console.log(response.status); // ok
    });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <Modal show onHide={onHide} centered>
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
              value={name}
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
                onClick={onHide}
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
