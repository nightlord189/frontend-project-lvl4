import React, { useState, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { SocketContext } from '../../../context';
import { removeChannel } from '../../../store/channels';

const RemoveChannelModal = ({ handleHide, payload }) => {
  const { t } = useTranslation();
  const id = payload;

  const [formError, setFormError] = useState('');
  const getErrorText = (key) => t(`channels.${key}`);

  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id,
    },
    onSubmit: async (values) => {
      socket.emit('removeChannel', { id: values.id }, (response) => {
        if (response.status === 'ok') {
          dispatch(removeChannel(id));
          handleHide();
        } else {
          setFormError('errorNetwork');
        }
      });
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channels.confirm')}</p>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
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
              <Button type="submit" variant="danger">{t('channels.delete')}</Button>
            </div>
          </Form.Group>

        </Form>
      </Modal.Body>
    </>
  );
};

export default RemoveChannelModal;
