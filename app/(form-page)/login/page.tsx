"use client";
import { login, type LoginPayload } from '@/api/modules/user';
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
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { toast } = useToast();

  const checkLoginAndRedirect = () => {
    if (!user.account) return;
    const { redirect } = searchParams;
    if (redirect) {
      if (redirect.includes('http')) location.href = redirect;
      else router.push(redirect);
    } else router.push('/');
  };
  useEffect(checkLoginAndRedirect, [user.account]);

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
    if (res?.success && res.data) {
      dispatch(setUserInfo(res.data));
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤！' });
  };

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