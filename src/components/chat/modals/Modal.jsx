import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal } from 'react-bootstrap';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';
import { closeModal } from '../../../store/modal';

const modals = {
  add: AddChannelModal,
  remove: RemoveChannelModal,
  rename: RenameChannelModal,
};

const Modal = () => {
  const { isOpened, type, payload } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleHide = () => {
    dispatch(closeModal());
  };

  const CurrentModal = modals[type];

  // {currentModal && <currentModal payload={[payload]} handleClose={handleClose} />}

  return (
    <BootstrapModal show={isOpened} onHide={handleHide} centered>
      {CurrentModal && <CurrentModal payload={payload} handleHide={handleHide} />}
    </BootstrapModal>
  );
};

export default Modal;
