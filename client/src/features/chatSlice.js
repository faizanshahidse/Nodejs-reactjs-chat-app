import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base = '/api';

export const create = createAsyncThunk(
  '/chat/create',
  async (chat, thunkAPI) => {
    try {
      const response = await axios.post(`${base}/chat/create`, chat);

      axios.defaults.headers.common = {
        Authorization: `bearer ${response.data.token}`,
      };
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: 'Network Error',
        });
      }
    }
  },
);