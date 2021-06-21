/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../store/channels.js';
import AddChannelModal from './modals/AddChannelModal.jsx';
import RemoveChannelModal from './modals/RemoveChannelModal.jsx';
import RenameChannelModal from './modals/RenameChannelModal.jsx';

const Channels = () => {
  const { t } = useTranslation();

  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const [modalState, setModalState] = useState({
    state: 'closed',
    type: null,
    payload: null,
  });

  const dispatch = useDispatch();

  const handleSelectChannel = (id) => () => {
    // console.log(id);
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
        <span>{t('channels.channels')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleAddChannel}>
          <span className="visually-hidden">+</span>
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
                      <Dropdown.Item href="#" id={channel.id} onClick={handleRemoveChannel(channel.id)}>{t('channels.delete')}</Dropdown.Item>
                      <Dropdown.Item href="#" id={channel.id} onClick={handleRenameChannel(channel)}>{t('channels.rename')}</Dropdown.Item>
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
