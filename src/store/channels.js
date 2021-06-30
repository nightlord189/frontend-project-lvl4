/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    updateChannels: (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    },
    addChannel: (state, action) => {
      if (state.channels.filter((x) => x.id === action.payload.id).length > 0) {
        return;
      }
      state.channels.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((x) => x.id !== action.payload);
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = DEFAULT_CHANNEL_ID;
      }
    },
    renameChannel: (state, action) => {
      const channel = state.channels.find((x) => x.id === action.payload.id);
      channel.name = action.payload.name;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const {
  updateChannels, addChannel, removeChannel, renameChannel, setCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
