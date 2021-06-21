import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../../context';
import { addChannel, setCurrentChannel } from '../../../store/channels';

const AddChannelModal = (props) => {
  const { t } = useTranslation();

  const { onHide } = props;
  const [name, setName] = useState('');
  const [formState, setFormState] = useState({
    state: 'editing',
    error: '',
  });
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { channels } = useSelector((state) => state.channels);

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
        error: t('channels.errorUnique'),
      });
      return;
    }
    // console.log(`submit add channel ${name}`);
    setFormState({
      state: 'sending',
      error: '',
    });
    socket.emit('newChannel', { name }, (response) => {
      if (response.status === 'ok') {
        dispatch(addChannel(response.data));
        dispatch(setCurrentChannel(response.data.id));
        onHide();
      } else {
        setFormState({
          state: 'editing',
          error: t('channels.errorNetwork'),
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
        <Modal.Title>{t('channels.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              minLength="3"
              maxLength="20"
              className="mb-2"
              name="name"
              data-testid="add-channel"
              required
              value={name}
              onChange={handleChangeName}
              ref={inputRef}
              isInvalid={formState.error !== ''}
            />
            <Form.Control.Feedback type="invalid">{formState.error}</Form.Control.Feedback>
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

export default AddChannelModal;
