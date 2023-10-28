import type { FC } from 'react';
import NightSky from '@/components/r3f/nightSky';

interface Props { }

const page: FC<Props> = ({ }) => {
  return (
    <>
      <h1 className='sr-only'></h1>
      <div className='w-screen h-screen'>
        <NightSky />
      </div>
    </>
  );
};

export default page;