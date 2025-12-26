import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../store/types';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    age: 30,
    UF: 'SP',
    friendIds: [1, 2, 3, 4],
    shareInfoWithPublic: false,
  },
  isAuthenticated: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    addFriend(state, action: PayloadAction<number>) {
      if (
        state.currentUser &&
        !state.currentUser.friendIds.includes(action.payload)
      ) {
        state.currentUser.friendIds.push(action.payload);
      }
    },
    removeFriend(state, action: PayloadAction<number>) {
      if (state.currentUser) {
        state.currentUser.friendIds = state.currentUser.friendIds.filter(
          id => id !== action.payload,
        );
      }
    },
    toggleShareInfo(state) {
      if (state.currentUser) {
        state.currentUser.shareInfoWithPublic =
          !state.currentUser.shareInfoWithPublic;
      }
    },
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { updateProfile, addFriend, logout, toggleShareInfo } =
  userSlice.actions;
export default userSlice.reducer;
