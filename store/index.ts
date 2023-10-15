import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user';
import { TypedUseSelectorHook, useSelector as _useSelector } from 'react-redux';
// import globalSlice from './global';

const store = configureStore({
  reducer: {
    // global: globalSlice.reducer
    user: userSlice.reducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

export type AppDispatch = typeof store.dispatch;