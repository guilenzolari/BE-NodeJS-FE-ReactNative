import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import friendsReducer from './friendSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    friends: friendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
