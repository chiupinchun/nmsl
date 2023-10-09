import { getLessonById } from '@/api/modules/lesson';
import { marked } from 'marked';
import { redirect } from 'next/navigation';
import type { FC } from 'react';
import LessonHead from '@/components/lesson/head';
import LessonList from '@/components/lesson/list';
import Comments from '@/components/lesson/comments';

interface Props {
  params: { id: string; };
}

const page: FC<Props> = async ({ params }) => {
  const { data: lesson } = await getLessonById(params.id);
  if (!lesson) redirect('/lesson/list');

  return (
    <>
      <LessonHead data={lesson}></LessonHead>
      <div className='flex my-5 h-80 md:h-[630px]'>
        <iframe width="100%" height="630" src={`https://www.youtube.com/embed/${lesson.src}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading='lazy' className='me-3 h-full'></iframe>
        <LessonList series={lesson.series} currentId={lesson.id}></LessonList>
      </div>
      <div dangerouslySetInnerHTML={{ __html: marked(lesson.content) }}></div>

      <Comments lessonId={lesson.id} />
    </>
  );
};

export default page;