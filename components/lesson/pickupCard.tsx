import { Lesson } from "@/api/modules/lesson";
import LessonHead from './head';
import { marked } from "marked";
import Link from "next/link";

export default ({ data }: { data: Lesson; }) => {
  if (!data) return <div></div>;
  return (
    <div className='relative mx-auto max-w-fit md:w-3/4 h-96 max-h-full overflow-y-hidden'>
      <LessonHead data={data}></LessonHead>
      <div className='flex flex-col-reverse md:flex-row justify-center '>
        <div className='me-5'>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${data.src?.split(',')?.[0]}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading='lazy'></iframe>
        </div>
        <div className='hidden md:block py-3 markdown-body' dangerouslySetInnerHTML={{ __html: marked(data.content) }}></div>
        <Link href={`/lesson/${data.id}`} target='_self' className='md:absolute bottom-5 right-5 p-2 rounded-md text-slate-300 font-bold text-lg bg-slate-900 bg-opacity-75 transition-all hover:text-xl'>前往課程&gt;&gt;</Link>
      </div>
    </div>
  );
};