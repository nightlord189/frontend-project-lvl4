import React from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const Modal = () => {
  const { isOpened, type, payload } = useSelector((state) => state.modal);
  return (
    <div>
      <AddChannelModal show={isOpened && type === 'add'} />
      <RenameChannelModal show={isOpened && type === 'rename'} channel={payload} />
      <RemoveChannelModal show={isOpened && type === 'remove'} id={payload} />
    </div>
  );
};

export default Modal;
