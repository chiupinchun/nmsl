"use client";
import { getLessons, type GetLessonsPayload } from '@/api/modules/lesson';
import useFetch from '@/hooks/useFetch';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { FC } from 'react';

interface Props {
  title?: string;
  children: React.ReactNode;
}
const page: FC<Props> = ({ title, children }) => {

  return (
    <>
      <nav className='hidden md:block ms-2 w-60 h-full border border-slate-500 rounded-md'>
        <h5 className='block py-1.5 text-center'>{title}</h5>
        <ol className='ps-8 overflow-y-auto list-decimal'>
          {children}
        </ol>
      </nav>
    </>
  );
};

export default page;