/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel } from '../../store/channels.js';
import { openModal } from '../../store/modal.js';

const Channels = () => {
  const { t } = useTranslation();

  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const dispatch = useDispatch();

  const handleSelectChannel = (id) => () => {
    // console.log(id);
    dispatch(setCurrentChannel(id));
  };

  const handleAddChannel = () => {
    dispatch(openModal({
      state: 'opened',
      type: 'add',
      payload: null,
    }));
  };

  const handleRemoveChannel = (id) => () => {
    dispatch(openModal({
      state: 'opened',
      type: 'remove',
      payload: id,
    }));
  };

  const handleRenameChannel = (channel) => () => {
    dispatch(openModal({
      state: 'opened',
      type: 'rename',
      payload: channel,
    }));
  };

  return (
    <div className="col-2 px-0 pt-5 border-end bg-light">
      <div className="d-flex justify-content-between mb-2 px-4">
        <span>{t('channels.channels')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleAddChannel}>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => {
          const cl = cn('w-100 rounded-0 text-left text-truncate btn', {
            'btn-secondary': channel.id === currentChannelId,
          });
          const dropdownCl = cn('flex-grow-0', {
            'btn-light': channel.id !== currentChannelId,
          });
          return (
            <li className="nav-item w-100" key={channel.id}>
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
    </div>
  );
};

export default Channels;
