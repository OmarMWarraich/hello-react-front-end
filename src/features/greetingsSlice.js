import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = '/api/v1/greetings';

const initialState = {
  greetings: [],
  status: 'idle',
  error: null,
};

export const fetchGreetings = createAsyncThunk(
  'greetings/fetchGreetings',
  async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  },
);

export const addNewGreeting = createAsyncThunk(
  'greetings/addNewGreeting',
  async (initialGreeting) => {
    const response = await axios.post(baseUrl, { greeting: initialGreeting });
    return response.data;
  },
);

const greetingsSlice = createSlice({
  name: 'greetings',
  initialState,
  reducers: {},
  extraReducers: {
    /* eslint-disable no-param-reassign */
    [fetchGreetings.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchGreetings.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched greetings to the array
      state.greetings = state.greetings.concat(action.payload);
    },
    [fetchGreetings.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewGreeting.fulfilled]: (state, action) => {
      // Add the new greeting to the array
      state.greetings.push(action.payload);
    },
  },
});

export default greetingsSlice.reducer;
