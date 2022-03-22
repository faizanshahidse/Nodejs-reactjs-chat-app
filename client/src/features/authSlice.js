import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios';

export const Login = createAsyncThunk('/auth/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/auth/login', user);
    debugger;
    localStorage.setItem('authToken', response.data.token);
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
});
