import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendDisplayData } from '../store/types';
import { RootState } from './index';

interface FriendsState {
  allUsers: FriendDisplayData[];
  loading: boolean;
}

const initialState: FriendsState = {
  allUsers: [
    {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      username: 'johndoe',
      email: 'john@doe.com',
    },
    {
      id: 2,
      firstname: 'Alice',
      lastname: 'Smith',
      username: 'alice',
      email: 'alice@test.com',
    },
    {
      id: 3,
      firstname: 'Bob',
      lastname: 'Johnson',
      username: 'bob',
      email: 'bob@test.com',
    },
    {
      id: 4,
      firstname: 'Charlie',
      lastname: 'Brown',
      username: 'charlie',
      email: 'charlie@test.com',
    },
  ],
  loading: false,
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = friendsSlice.actions;
export default friendsSlice.reducer;

export const selectMyFriends = (state: RootState) => {
  const myFriendIds = state.user.currentUser?.friendIds || [];
  return state.friends.allUsers.filter(user => myFriendIds.includes(user.id));
};

export const selectUserSuggestions = (state: RootState) => {
  const myFriendIds = state.user.currentUser?.friendIds || [];
  const myId = state.user.currentUser?.id;
  return state.friends.allUsers.filter(
    user => user.id !== myId && !myFriendIds.includes(user.id),
  );
};
