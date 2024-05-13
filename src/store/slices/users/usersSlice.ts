import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { User } from '@/types/User';

const initialState: User[] = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, { payload }: PayloadAction<User[]>) => {
      return payload
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      return [...state,action.payload]
    }
  },
});

export const {
  addUsers,
  addNewUser
} = usersSlice.actions;

export default usersSlice.reducer;
