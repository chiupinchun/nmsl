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

        socket.on('notice', msg => {
          console.log(msg);
        });
        socket.on('announce', msg => {
          console.log(msg);
        });
        socket.on('error', msg => {
          console.log(msg);
        });
      }
    });
  }

  return null;
};

export default page;