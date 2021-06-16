import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { SocketContext } from '../../../hooks';
import { removeChannel } from '../../../store/channels';

const RemoveChannelModal = (props) => {
  const { onHide, id } = props;
  const [formState, setFormState] = useState({
    state: 'editing',
  });
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const handleRemove = async () => {
    if (formState.state !== 'editing') {
      return;
    }
    console.log(`submit remove channel ${id}`);
    setFormState({
      state: 'sending',
    });
    socket.emit('removeChannel', { id }, () => {
      dispatch(removeChannel(id));
      onHide();
    });
  };

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <button type="button" className="me-2 btn btn-secondary" onClick={onHide}>Отменить</button>
          <button type="button" className="btn btn-danger" onClick={handleRemove}>Удалить</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
