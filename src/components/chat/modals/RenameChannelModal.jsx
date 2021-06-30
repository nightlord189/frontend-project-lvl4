import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { SocketContext } from '../../../context';
import { renameChannel } from '../../../store/channels.js';

const RenameChannelModal = ({ handleHide, payload }) => {
  const { t } = useTranslation();
  const channel = payload;

  const [formError, setFormError] = useState('');

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { channels } = useSelector((state) => state.channels);

  const getErrorText = (key) => t(`channels.${key}`);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: async (values) => {
      if (channels.filter((x) => x.name === values.name).length > 0) {
        setFormError('errorUnique');
        return;
      }
      socket.emit('renameChannel', { id: channel.id, name: values.name }, (response) => {
        if (response.status === 'ok') {
          dispatch(renameChannel({
            ...channel,
            name: values.name,
          }));
          handleHide();
        } else {
          setFormError('errorNetwork');
        }
        // console.log(response.status); // ok
      });
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              minLength="3"
              maxLength="20"
              className="mb-2"
              name="name"
              data-testid="rename-channel"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputRef}
              isInvalid={formError}
            />
            <Form.Control.Feedback type="invalid">{getErrorText(formError)}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                className="me-2"
                variant="secondary"
                onClick={handleHide}
              >
                {t('channels.cancel')}
              </Button>
              <Button type="submit" disabled={formik.isSubmitting}>{t('channels.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameChannelModal;
