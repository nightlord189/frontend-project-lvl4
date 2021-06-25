import React from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import RenameChannelModal from './RenameChannelModal.jsx';

const Modal = () => {
  const { isOpened, type, payload } = useSelector((state) => state.modal);
  if (!isOpened) {
    return null;
  }
  switch (type) {
    case 'add':
      return <AddChannelModal />;
    case 'remove':
      return <RemoveChannelModal id={payload} />;
    case 'rename':
      return <RenameChannelModal channel={payload} />;
    default:
      throw new Error(`unknown modal type: ${type}`);
  }
};

export default Modal;
