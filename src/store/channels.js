/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: 0,
  },
  reducers: {
    update: (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
      state.currentChannelId = action.payload.id;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { update, addChannel, setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
