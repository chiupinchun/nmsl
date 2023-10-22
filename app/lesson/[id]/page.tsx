"use client";
import { getLessonById } from '@/api/modules/lesson';
import { marked } from '@/lib/utils';
import { redirect, useRouter } from 'next/navigation';
import type { FC } from 'react';
import LessonHead from '@/components/lesson/head';
import LessonList from '@/components/lesson/list';
import Comments from '@/components/comments';
import Breadcrumbs from '@/components/breadcrumbs';
import { request } from '@/api/core';
import { useToast } from '@/components/ui/use-toast';
import useFetch from '@/hooks/useFetch';

interface Props {
  params: { id: string; };
}

const page: FC<Props> = ({ params }) => {
  const { toast } = useToast();

  const { data: lesson, refresh } = useFetch(
    () => getLessonById(params.id)
  );

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
        {lesson?.data && <iframe width="100%" height="630" src={`https://www.youtube.com/embed/${lesson.data.src}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading='lazy' className='me-3 h-full'></iframe>}
        <LessonList series={lesson?.data?.series} lessonId={lesson?.data?.id}></LessonList>
      </div>
      <div dangerouslySetInnerHTML={{ __html: marked(lesson?.data?.content) }}></div>

      <Comments comments={lesson?.data?.comments} onSubmit={comment} className='my-10' commentLabel='課堂討論留言板' />
    </>
  );
};

export default page;