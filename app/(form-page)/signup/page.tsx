"use client";
import { signup, type SignupPayload } from '@/api/modules/user';
import Form, { FormConfig } from '@/components/ui/form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

interface Props { }

const page: FC<Props> = ({ }) => {
  const formData: FormConfig<SignupPayload> = {
    account: {
      text: '帳號',
      type: 'string',
      range: [8, 20],
      default: ''
    },
    password: {
      text: '密碼',
      type: 'string',
      range: [8, 20],
      default: ''
    },
    name: {
      text: '暱稱',
      type: 'string',
      range: [1, 20],
      default: ''
    }
  };
  const onSubmit = async (payload: SignupPayload) => {
    const res = await signup(payload);
    if (res.success) {
      alert('註冊成功！');
      useRouter().push('/login');
    } else alert('註冊失敗：' + res.data);
  };

  return (
    <>
      <Form data={formData} title='帳號註冊' submit={{
        text: '註冊', onSubmit,
        slot: <p className='mt-3'>已有帳號？<Link href='/login'>點我登入</Link>。</p>
      }}></Form>
    </>
  );
};

export default page;