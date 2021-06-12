import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);

  return (
    <div className="col-2 px-0 pt-5 border-end bg-light">
      <div className="d-flex justify-content-between mb-2 px-4">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
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
          return (
            <li className="nav-item" key={channel.id}>
              <button type="button" className={cl}>
                <span className="me-3">#</span>
                {channel.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;