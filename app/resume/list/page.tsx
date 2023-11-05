"use client";
import { getUsers } from '@/api/modules/user';
import useFetch from '@/hooks/useFetch';
import { useState, type FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import defaultAvatar from '@/assets/images/defaultAvatar.webp';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Pagination from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  searchParams: { [key: string]: string | undefined; };
}

const ResumeList: FC<Props> = ({ searchParams }) => {
  const router = useRouter();
  const path = usePathname();

  const { data: users } = useFetch(
    () => getUsers({ ...searchParams, show: '12' }),
    [searchParams]
  );

  const [tech, setTech] = useState(searchParams.tech ?? '');
  const [adress, setAdress] = useState(searchParams.adress ?? '');
  const [keyword, setKeyword] = useState(searchParams.keyword ?? '');

  const search = () => {
    const query: Record<string, string> = {};
    if (tech) query.tech = tech;
    if (adress) query.adress = adress;
    if (keyword) query.keyword = keyword;

    router.push(path + '?' + new URLSearchParams(query).toString());
  };

  return (
    <>
      <section className='relative px-6 py-5 border rounded'>
        <h3>篩選人才</h3>
        <form className='md:flex my-3 justify-between md:space-x-8 space-y-2 md:space-y-0'>
          <label className='block flex-grow'>擅長技術
            <Input value={tech} onChange={e => setTech(e.target.value)} />
          </label>
          <label className='block flex-grow'>居住地
            <Input value={adress} onChange={e => setAdress(e.target.value)} />
          </label>
          <label className='block flex-grow'>關鍵字
            <Input value={keyword} onChange={e => setKeyword(e.target.value)} />
          </label>
        </form>
        <div className='md:absolute left-0 -bottom-5 w-full'>
          <div className='md:flex justify-center mx-auto md:w-36 bg-background'>
            <Button onClick={search} className='w-full md:w-[unset]'>搜尋</Button>
          </div>
        </div>
      </section>
      <section className='mt-10'>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-max'>
          {users?.data?.length ? users.data.map(user => (
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
          )) : '沒有資料'}
        </ul>
        {!!users?.data?.length && <Pagination totalPage={users?.totalPage ?? 0} searchParam='page' className='flex justify-center mt-5' />}
      </section>
    </>
  );
};

export default ResumeList;