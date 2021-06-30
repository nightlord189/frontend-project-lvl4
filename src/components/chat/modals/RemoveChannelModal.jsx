import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../../../context';
import { removeChannel } from '../../../store/channels';

const RemoveChannelModal = ({ handleHide, payload }) => {
  const { t } = useTranslation();
  const id = payload;

  const [formState, setFormState] = useState({
    state: 'editing',
  });
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const handleRemove = async () => {
    if (formState.state !== 'editing') {
      return;
    }
    // console.log(`submit remove channel ${id}`);
    setFormState({
      state: 'sending',
    });
    socket.emit('removeChannel', { id }, () => {
      dispatch(removeChannel(id));
      setFormState({
        state: 'editing',
        error: '',
      });
      handleHide();
    });
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channels.confirm')}</p>
        <div className="d-flex justify-content-end">
          <button type="button" className="me-2 btn btn-secondary" onClick={handleHide}>{t('channels.cancel')}</button>
          <button type="button" className="btn btn-danger" onClick={handleRemove}>{t('channels.delete')}</button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RemoveChannelModal;
