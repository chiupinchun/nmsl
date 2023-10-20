import { request } from '@/api/core';
import { Button } from '@/components/ui/button';
import useFetch from 'swr';
import { useState } from 'react';
import Carousel from '@/components/ui/carousel';
import { getPickupLesson } from '@/api/modules/lesson';
import PickupCard from '@/components/lesson/pickupCard';
import Link from 'next/link';

export default async function Home() {
  const pickupLessons = await getPickupLesson();


  return (
    <>
      <h1 className='text-2xl font-bold'>NMSL檸檬森林</h1>
      <h2 className='text-xl font-bold'>專業前端培訓</h2>
      <h2 className='mt-5 text-xl font-bold'>精選課程</h2>
      <Carousel>
        {[...(pickupLessons?.data?.map(item => (
          <PickupCard data={item} key={item.id}></PickupCard>
        )) ?? [])]}
      </Carousel>
      <Link href='/lesson/list' className='block mx-auto px-6 py-2 w-fit border border-slate-700 rounded-3xl hover:bg-slate-900'>點我看更多</Link>
      <h2 className='mt-5 text-xl font-bold'>沒找到想看的課程？你可以——</h2>
      <div className='my-5 space-x-5'>

        <Link href='/fountain' className='px-4 py-2 border border-slate-700 rounded-3xl hover:bg-slate-900'>點我去許願</Link>
      </div>
    </>
  );
}
