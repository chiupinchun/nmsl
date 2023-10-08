import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    account: '',
    name: ''
  },
  reducers: {
    setUserInfo(state, action) {
      Object.assign(state, action.payload);
    }
  }
});

export default userSlice;
export const { setUserInfo } = userSlice.actions;