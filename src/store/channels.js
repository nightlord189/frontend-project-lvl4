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
  },
});

export const { update } = channelsSlice.actions;

export default channelsSlice.reducer;
