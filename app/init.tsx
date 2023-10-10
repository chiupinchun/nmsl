"use client";
import type { FC } from 'react';
import { io } from 'socket.io-client';
import { getUserInfo } from '@/api/modules/user';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/user';
import useCookie from '@/hooks/useCookie';

interface Props { }

const page: FC<Props> = ({ }) => {
  const [token] = useCookie('token');
  const dispatch = useDispatch();
  if (token) {
    getUserInfo().then(res => {
      if (res?.success && res.data) {
        dispatch(setUserInfo(res.data));

        const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL!.replace(/^http(s)?:\/\//, '') + '/notice', { auth: { token } });

        socket.on('notice', message => {
          console.log(message);
        });
        socket.on('announce', message => {
          console.log(message);
        });
        socket.on('error', message => {
          console.log(message);
        });
      }
    });
  }

  return null;
};

export default page;