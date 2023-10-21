"use client";
import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';

interface Props { }

const page: FC<Props> = ({ }) => {
  const query = useSearchParams();
  return (
    <>
      <h1 className='sr-only'></h1>
    </>
  );
};

export default page;