import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user';
// import globalSlice from './global';

const store = configureStore({
  reducer: {
    // global: globalSlice.reducer
    user: userSlice.reducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;