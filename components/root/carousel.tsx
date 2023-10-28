import type { FC } from 'react';
import Carousel from '../ui/carousel';
import PickupCard from '../lesson/pickupCard';
import { getPickupLesson } from '@/api/modules/lesson';
import Link from 'next/link';

interface Props { }

const page: FC<Props> = async ({ }) => {
  const pickupLessons = await getPickupLesson();
  return (
    <>
      <h2 className='my-10 md:mx-auto px-10 py-3 w-fit bg-slate-500 text-xl font-bold bg-gradient-to-r from-slate-400 to-slate-700'>精選課程</h2>
      <Carousel>
        {[...(pickupLessons?.data?.map(item => (
          <PickupCard data={item} key={item.id}></PickupCard>
        )) ?? [])]}
      </Carousel>
      <Link href='/lesson/list' className='block mx-auto px-6 py-2 w-fit border border-slate-700 rounded-3xl hover:bg-slate-900'>點我看更多</Link>
    </>
  );
};

export default page;