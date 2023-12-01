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

  const [showNeighborBlock, setShowNeighborBlock] = useState(true);
  const neighbor = useMemo(() => {
    type LinkLike = { lesson: Lesson; video: number; };
    const result: {
      prev: LinkLike | null;
      next: LinkLike | null;
    } = {
      prev: null,
      next: null
    };
    if (lesson?.data?.id && sameSeriesLessons?.data?.length && video !== undefined) {
      const videos: LinkLike[] = [];
      let found = false;
      for (let i = 0; i < sameSeriesLessons.data.length; i++) {
        const currentLeson = sameSeriesLessons.data[i];
        if (currentLeson?.src) {
          const length = currentLeson.src.split(',').length;
          for (let j = 0; j < length; j++) {
            if (found) {
              result.next = { lesson: currentLeson, video: j };
              break;
            } else if (currentLeson.id === lesson.data.id && j === video) {
              result.prev = videos[videos.length - 1];
              found = true;
            }
            videos.push({ lesson: currentLeson, video: j });
          }
        }
      }
    }

    return result;
  }, [lesson?.data?.id, sameSeriesLessons?.data?.length]);

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
        <ul className={cn('flex justify-between py-2 overflow-hidden transition-all duration-300', showNeighborBlock ? 'max-h-48 scale-y-100' : 'max-h-0 scale-y-0')}>
          <li className='p-1 md:p-2 border rounded border-slate-700'>{neighbor.prev && (
            <>
              <h4 className='hidden md:block'>
                {neighbor.prev.lesson.title} - 第{neighbor.prev.video + 1}集
              </h4>
              <Link href={`/lesson/${neighbor.prev.lesson.id}?video=${neighbor.prev.video}`} className='block me-auto py-1 md:py-2 w-fit'>&lt;&lt; 上一集</Link>
            </>
          )}</li>
          <li className='p-1 md:p-2 border rounded border-slate-700'>{neighbor.next && (
            <>
              <h4 className='hidden md:block'>
                {neighbor.next.lesson.title} - 第{neighbor.next.video + 1}集
              </h4>
              <Link href={`/lesson/${neighbor.next.lesson.id}?video=${neighbor.next.video}`} className='block ms-auto py-1 md:py-2 w-fit'>下一集 &gt;&gt;</Link>
            </>
          )}</li>
        </ul>
        <div className='flex justify-center absolute -bottom-2 w-full'>
          <Button onClick={() => setShowNeighborBlock(!showNeighborBlock)} className='h-3'><ChevronDown className={cn(showNeighborBlock ? 'rotate-180' : '', 'transition')} /></Button>
        </div>
      </nav>


      <div className='markdown-body mt-5' dangerouslySetInnerHTML={{ __html: marked(lesson?.data?.content) }}></div>

      <Comments comments={lesson?.data?.comments} onSubmit={comment} className='my-10' commentLabel='課堂討論留言板' />
    </>
  );
};

export default page;