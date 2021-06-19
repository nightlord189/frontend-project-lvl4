// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  authPath: [host, prefix, 'login'].join('/'),
  signupPath: [host, prefix, 'signup'].join('/'),
  getDataPath: [host, prefix, 'data'].join('/'),
};
