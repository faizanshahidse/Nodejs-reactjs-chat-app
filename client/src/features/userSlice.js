import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';

export const GetAllUsers = createAsyncThunk(
  '/user/getall',
  async (thunkAPI) => {
    try {
      const response = await axios.get('/user/getAll');

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

const user = createSlice({
  name: 'user',
  initialState: {
    users: [],
    err: '',
    loading: false,
    done: false,
  },
  reducers: {},
  extraReducers: {
    [GetAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.done = true;
      state.users = action.payload.data;
    },
    [GetAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.err = action.payload.err;
    },
  },
});

const { reducer } = user;

export default reducer;
