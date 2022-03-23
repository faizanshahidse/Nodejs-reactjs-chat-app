import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';

export const create = createAsyncThunk(
  '/chat/create',
  async (chat, thunkAPI) => {
    try {
      const response = await axios.post('/chat/create', chat);
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

export const GetList = createAsyncThunk(
  '/chat/getList',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/chat/getList/${id}`);
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

const chat = createSlice({
  name: 'chat',
  initialState: {
    list: [],
    err: '',
    loading: false,
    done: false,
  },
  reducers: {},
  extraReducers: {
    [GetList.pending]: (state, action) => {
      state.loading = true;
    },
    [GetList.fulfilled]: (state, action) => {
      state.loading = false;
      state.done = true;
      state.list = action.payload.data;
    },
    [GetList.rejected]: (state, action) => {
      state.loading = false;
      state.err = action.payload.err;
    },
  },
});

const { reducer } = chat;

export default reducer;
