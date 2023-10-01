"use client";
import Carousel from '@/components/ui/carousel';
import type { FC } from 'react';

interface Props { }

const page: FC<Props> = ({ }) => {
  return (
    <>
      <h1 className='sr-only'>課程列表</h1>
      <Carousel>
        <img src="https://placekitten.com/800/400" alt="Slide 1" className="w-full h-full object-cover" />
        <img src="https://placekitten.com/801/400" alt="Slide 2" className="w-full h-full object-cover" />
        <img src="https://placekitten.com/802/400" alt="Slide 3" className="w-full h-full object-cover" />
      </Carousel>
    </>
  );
};

export default page;