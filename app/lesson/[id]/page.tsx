"use client";
import { Lesson, getLessonById, getLessons, viewCount } from '@/api/modules/lesson';
import { cn, marked } from '@/lib/utils';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, type FC, useState, useCallback, useMemo } from 'react';
import LessonHead from '@/components/lesson/head';
import LessonList from '@/components/lesson/list';
import Comments from '@/components/comments';
import Breadcrumbs from '@/components/breadcrumbs';
import { request } from '@/api/core';
import { useToast } from '@/components/ui/use-toast';
import useFetch from '@/hooks/useFetch';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
import Neighbor from '@/components/lesson/neighbor';

interface Props {
  params: { id: string; };
  searchParams: {
    video: string;
  };
}

const page: FC<Props> = ({ params, searchParams }) => {
  const { toast } = useToast();

  const { data: lesson, refresh } = useFetch(
    () => getLessonById(params.id, true)
  );

  const { data: sameSeriesLessons } = useFetch(
    () => lesson?.data?.id ? getLessons({ series: lesson?.data?.series, show: '99999' }) : Promise.resolve(null),
    [lesson?.data?.id]
  );

  const isSameLesson = useCallback((id: number) => id >= 0 && id === lesson?.data?.id, [lesson?.data?.id]);

  const video = searchParams.video ? +searchParams.video : 0;

  useEffect(() => {
    viewCount(params.id);
  }, []);

  const comment = async (
    payload: { content: string, tags: string[]; }
  ) => {
    if (!lesson?.data?.id) return;
    const res = await request('/lesson-comment', {
      method: 'POST',
      body: { ...payload, lessonId: lesson.data.id }
    });
    if (res?.success) {
      toast({ description: '留言成功。' });
      refresh();
      window.scrollTo(0, document.body.scrollHeight);
      return true;
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤！' });
  };

  return (
    <>
      {lesson?.data && <LessonHead data={lesson.data}></LessonHead>}
      <div className='flex my-5 h-80 md:h-[630px]'>
        {lesson?.data && <iframe width="100%" height="630" src={`https://www.youtube.com/embed/${lesson.data.src?.split(',')?.[video]}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading='lazy' className='h-full'></iframe>}
        <LessonList title={lesson?.data?.series}>
          {sameSeriesLessons?.data?.map(item => (
            <li key={item.id}>
              <Link href={`/lesson/${item.id}`} className={cn('block px-3 py-1.5', isSameLesson(item.id) ? 'bg-slate-900' : 'hover:bg-slate-700')}>
                {item.title}
              </Link>
              {isSameLesson(item.id) && (
                <ul className='-ms-4 ps-8 list-[disclosure-closed]'>
                  {lesson!.data.src?.split(',')?.map((id, idx) => (
                    <li key={id}>
                      <Link href={`/lesson/${params.id}?video=${idx}`} className={cn('block px-3 py-1.5 hover:bg-slate-700', video === idx ? 'bg-slate-900' : null)}>第{idx + 1}集</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </LessonList>
      </div>

      <nav className='sticky top-header-height border-b rounded border-slate-700 bg-background opacity-75'>
        <Neighbor lesson={lesson?.data} list={sameSeriesLessons?.data} video={video} />
      </nav>

      <div className='markdown-body mt-5' dangerouslySetInnerHTML={{ __html: marked(lesson?.data?.content) }}></div>

      <Comments comments={lesson?.data?.comments} onSubmit={comment} className='my-10' commentLabel='課堂討論留言板' />
    </>
  );
};

export default page;