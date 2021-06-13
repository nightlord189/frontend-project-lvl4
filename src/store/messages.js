/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { updateMessages, sendMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
