import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './features/userSlice';
import chatReducer from './features/chatSlice';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
});

export default rootReducer;
