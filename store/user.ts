import { UserInfo } from '@/api/modules/user';
import useCookie from '@/hooks/useCookie';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UserInfo = {
  id: '',
  name: '',
  avatar: '',

  sex: '',
  contract: '',
  adress: '',
  position: '',
  field: '',
  techs: '',
  description: '',

  checkable: true,

  createTime: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<Partial<typeof initialState>>) {
      Object.assign(state, action.payload);
    },
    logout(state, action) {
      Object.assign(state, initialState);
    }
  }
});

export default userSlice;
export const { setUserInfo, logout } = userSlice.actions;