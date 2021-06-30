import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { SocketContext } from '../../../context';
import { setCurrentChannel } from '../../../store/channels';

const AddChannelModal = ({ handleHide }) => {
  const { t } = useTranslation();
  const [formError, setFormError] = useState('');

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { channels } = useSelector((state) => state.channels);

  const getErrorText = (key) => t(`channels.${key}`);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      if (channels.filter((x) => x.name === values.name).length > 0) {
        setFormError('errorUnique');
        return;
      }
      socket.emit('newChannel', { name: values.name }, (response) => {
        if (response.status === 'ok') {
          dispatch(setCurrentChannel(response.data.id));
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
        <Modal.Title>{t('channels.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              minLength="3"
              maxLength="20"
              className="mb-2"
              name="name"
              data-testid="add-channel"
              required
              value={formik.values.username}
              onChange={formik.handleChange}
              ref={inputRef}
              isInvalid={formError}
            />
            <Form.Control.Feedback type="invalid">{ getErrorText(formError) }</Form.Control.Feedback>
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
    </>
  );
};

export default AddChannelModal;
