"use client";
import { getUsers } from '@/api/modules/user';
import useFetch from '@/hooks/useFetch';
import type { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import defaultAvatar from '@/assets/images/defaultAvatar.jpg';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Pagination from '@/components/ui/pagination';

interface Props {
  searchParams: { [key: string]: string | undefined; };
}

const ResumeList: FC<Props> = ({ searchParams }) => {
  const { data: users } = useFetch(
    () => getUsers({ ...searchParams, show: '12' })
  );

  return (
    <>
      <section className='h-48 border'>篩選區</section>
      <section className='mt-5'>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-max'>
          {users?.data?.length && users.data.map(user => (
            <li key={user.id}>
              <Card className='h-full'>
                <CardHeader>
                  <Link href={`/resume/${user.id}`}><Image src={user.avatar || defaultAvatar} width={0} height={0} alt={user.name} className='mx-auto w-auto h-36' priority /></Link>
                </CardHeader>
                <CardContent>
                  <p>
                    <Link href={`/resume/${user.id}`}>{user.name}{user.position && ' —— ' + user.position}</Link>
                  </p>
                  <p>
                    居住地：{user.adress || '未填'}
                  </p>
                </CardContent>
                <CardFooter className='block'>
                  擅長技術
                  <ul className='flex space-x-2 overflow-x-auto scroll-bar'>
                    {user.techs ? user.techs.split(',').map((tech, idx) => (
                      <li key={idx}><Badge>{tech}</Badge></li>
                    )) : '未填'}
                  </ul>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
        <Pagination totalPage={users?.totalPage ?? 0} searchParam='page' className='flex justify-center mt-5' />
      </section>
    </>
  );
};

export default ResumeList;