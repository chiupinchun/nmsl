import useCookie from '@/hooks/useCookie';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  account: '',
  name: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      Object.assign(state, action.payload);
    },
    logout(state, action) {
      Object.assign(state, initialState);
    }
  }
});

export default userSlice;
export const { setUserInfo, logout } = userSlice.actions;