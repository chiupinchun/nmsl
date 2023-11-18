"use client";
import { signup, type SignupPayload } from '@/api/modules/user';
import Form, { FormConfig } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useSelector } from '@/store';
import { setUserInfo } from '@/store/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, type FC } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  searchParams: { [key: string]: string | undefined; };
}

const page: FC<Props> = ({ searchParams }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const router = useRouter();
  const { toast } = useToast();

  const checkLoginAndRedirect = () => {
    if (!user.id) return;
    const { redirect } = searchParams;
    if (redirect) {
      if (redirect.includes('http')) location.href = redirect;
      else router.push(redirect);
    } else router.push('/');
  };
  useEffect(checkLoginAndRedirect, [user.id]);

  const formData: FormConfig<SignupPayload> = {
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
      dispatch(setUserInfo(res.data));
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤！' });
  };

  return (
    <>
      <Form data={formData} title='帳號註冊' submit={{
        text: '註冊', onSubmit,
        slot: <p className='flex justify-center items-center my-3 md:my-0'>已有帳號？<Link href='/login' className='hover:underline'>點我登入</Link>。</p>
      }}></Form>
    </>
  );
};

export default page;