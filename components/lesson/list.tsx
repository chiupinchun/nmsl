"use client";
import { getLessons, type GetLessonsPayload } from '@/api/modules/lesson';
import useFetch from '@/hooks/useFetch';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { FC } from 'react';

const page: FC<GetLessonsPayload & { currentId?: number; }> = ({ currentId, ...condition }) => {
  const { data: lessons } = useFetch(
    () => getLessons({ ...condition, show: '99999' })
  );
  return (
    <>
      <nav className='hidden md:block w-60 h-full border border-slate-500 rounded-md'>
        <h5 className='block py-1.5 text-center'>{condition.series ? `【${condition.series}】` : ''}合輯列表</h5>
        <ol className='ps-8 overflow-y-auto list-decimal'>
          {lessons?.data?.map((lesson, idx) => (
            <li key={lesson.id} className=''>
              <Link href={`/lesson/${lesson.id}`} className={cn('block px-3 py-1.5 hover:bg-slate-900', lesson.id === currentId ? 'bg-slate-700' : null)}>{lesson.title}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default page;