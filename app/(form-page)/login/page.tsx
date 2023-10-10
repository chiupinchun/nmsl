"use client";
import { request } from '@/api/core';
import { login, type LoginPayload } from '@/api/modules/user';
import Form, { FormConfig } from '@/components/ui/form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, type FC } from 'react';

interface Props { }

const page: FC<Props> = ({ }) => {
  const formData: FormConfig<LoginPayload> = {
    account: {
      text: '帳號',
      type: 'string',
      range: [8, 20],
      default: ''
    },
    password: {
      text: '密碼',
      type: 'password',
      range: [8, 20],
      default: ''
    }
  };
  const onSubmit = async (payload: LoginPayload) => {
    const res = await login(payload);
    console.log(res);
  };

  // useEffect(() => {
  //   request('/user').then(res => console.log(res));
  // }, []);

  return (
    <>
      <Form data={formData} title='帳號登入' submit={{
        text: '登入', onSubmit,
        slot: <p className='flex justify-center items-center my-3 md:my-0'>沒有帳號？<Link href='/signup' className='hover:underline'>點我註冊</Link>。</p>
      }}></Form>
    </>
  );
};

export default page;