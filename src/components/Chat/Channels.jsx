/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { setCurrentChannel } from '../../store/channels.js';
import AddChannelModal from './modals/AddChannelModal.jsx';
import RemoveChannelModal from './modals/RemoveChannelModal.jsx';
import RenameChannelModal from './modals/RenameChannelModal.jsx';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const [modalState, setModalState] = useState({
    state: 'closed',
    type: null,
    payload: null,
  });

  const dispatch = useDispatch();

  const handleSelectChannel = (id) => () => {
    console.log(id);
    dispatch(setCurrentChannel(id));
  };

  const handleAddChannel = () => {
    setModalState({
      state: 'opened',
      type: 'add',
      payload: null,
    });
  };

  const handleRemoveChannel = (id) => () => {
    setModalState({
      state: 'opened',
      type: 'remove',
      payload: id,
    });
  };

  const handleRenameChannel = (channel) => () => {
    setModalState({
      state: 'opened',
      type: 'rename',
      payload: channel,
    });
  };

  const handleHideModal = () => {
    setModalState({
      state: 'closed',
      type: null,
      payload: null,
    });
  };

  const renderModals = () => {
    if (modalState.state !== 'opened') {
      return null;
    }
    switch (modalState.type) {
      case 'add':
        return <AddChannelModal onHide={handleHideModal} />;
      case 'remove':
        return <RemoveChannelModal onHide={handleHideModal} id={modalState.payload} />;
      case 'rename':
        return <RenameChannelModal onHide={handleHideModal} channel={modalState.payload} />;
      default:
        return null;
    }
  };

  return (
    <div className="col-2 px-0 pt-5 border-end bg-light">
      <div className="d-flex justify-content-between mb-2 px-4">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleAddChannel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((channel) => {
          const cl = cn('w-100 px-4 rounded-0 text-start btn', {
            'btn-secondary': channel.id === currentChannelId,
          });
          const dropdownCl = cn('flex-grow-0', {
            'btn-light': channel.id !== currentChannelId,
          });
          return (
            <li className="nav-item" key={channel.id}>
              <Dropdown className="d-flex" as={ButtonGroup}>
                <button type="button" className={cl} id={channel.id} onClick={handleSelectChannel(channel.id)}>
                  <span className="me-3">#</span>
                  {} {channel.name}
                </button>
                {channel.removable ? (
                  <>
                    <Dropdown.Toggle split className={dropdownCl} id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      <Dropdown.Item href="#" id={channel.id} onClick={handleRemoveChannel(channel.id)}>Удалить</Dropdown.Item>
                      <Dropdown.Item href="#" id={channel.id} onClick={handleRenameChannel(channel)}>Переименовать</Dropdown.Item>
                    </Dropdown.Menu>
                  </>
                ) : null}
              </Dropdown>
            </li>
          );
        })}
      </ul>
      {renderModals()}
    </div>
  );
};

export default Channels;
