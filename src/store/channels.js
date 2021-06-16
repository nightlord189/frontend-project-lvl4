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
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((x) => x.id !== action.payload);
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = state.channels[0].id;
      }
    },
    renameChannel: (state, action) => {
      console.log(action.payload);
      state.channels = state.channels.reduce((acc, channel) => {
        if (channel.id === action.payload.id) {
          return [...acc, action.payload];
        }
        return [...acc, channel];
      }, []);
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const {
  update, addChannel, removeChannel, renameChannel, setCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
