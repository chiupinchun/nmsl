import { configureStore } from '@reduxjs/toolkit';
// import globalSlice from './global';

const store = configureStore({
  reducer: {
    // global: globalSlice.reducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
