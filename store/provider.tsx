"use client";
import type { FC } from 'react';
import { Provider } from 'react-redux';
import store from '.';

interface Props {
  children: React.ReactNode;
}

const page: FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default page;