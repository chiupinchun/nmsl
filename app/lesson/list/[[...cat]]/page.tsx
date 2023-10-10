"use client";
import { getPickupLesson, getLessons } from '@/api/modules/lesson';
import Carousel from '@/components/ui/carousel';
import useFetch from '@/hooks/useFetch';
import { useMemo, type FC, useState } from 'react';
import { marked } from 'marked';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { Lesson } from '@/api/modules/lesson';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from '@/hooks/useRouter';
import Pagination from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ApiProgress } from '@/components/ui/progress';
import LessonHead from '@/components/lesson/head';

const LessonCard = ({ data }: { data: Lesson; }) => {
  if (!data) return <div></div>;
  return (
    <div className='mx-auto max-w-fit w-3/4 h-96 max-h-full overflow-y-hidden'>
      <LessonHead data={data}></LessonHead>
      <div className='flex flex-col-reverse md:flex-row justify-center relative '>
        <div className='me-5'>
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${data.src}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading='lazy'></iframe>
        </div>
        <div className='hidden md:block py-3' dangerouslySetInnerHTML={{ __html: marked(data.content) }}></div>
        <Link href={`/lesson/${data.id}`} target='_blank' className='md:absolute bottom-5 right-5 text-slate-300 font-bold text-lg transition-all hover:text-xl'>前往課程&gt;&gt;</Link>
      </div>
    </div>
  );
};

interface Props { }
const page: FC<Props> = ({ }) => {
  const router = useRouter();
  const querySeries = useMemo(() => router.query.series ?? '', [router.query.series]);

  const changeTab = (series: string) => {
    const { series: _series, ...query } = router.query;

    router.push({ query: series ? { ...query, series } : query });
  };

  const { data: pickupLessons } = useFetch(getPickupLesson);

  const { data: lessons, pending: lessonsPending } = useFetch(
    () => getLessons(router.query),
    [router.query]
  );

  const [keyword, setKeyword] = useState(decodeURIComponent(router.query.search ?? ''));
  const search = () => {
    router.push({ query: { ...router.query, search: keyword, page: '1' } });
  };

  return (
    <>
      <h1 className='sr-only'>課程列表</h1>
      <Carousel>
        {[...(pickupLessons?.data?.map(item => (
          <LessonCard data={item} key={item.id}></LessonCard>
        )) ?? [])]}
      </Carousel>

      <Tabs className="mt-10 mx-auto md:w-3/4" value={querySeries} onValueChange={changeTab}>
        <TabsList className="md:grid w-full grid-cols-6 rounded-b-none">
          <TabsTrigger value=''>全部</TabsTrigger>
          <TabsTrigger value='js'>JavaScript</TabsTrigger>
          <TabsTrigger value='vue'>Vue</TabsTrigger>
          <div></div>
          <div></div>
          <div className='relative'>
            <Input value={keyword} onChange={e => setKeyword(e.target.value)} onKeyUp={e => e.key === 'Enter' && search()} className='pe-8 h-8'></Input>
            <Search onClick={search} className='absolute top-1 right-2 cursor-pointer' />
          </div>
        </TabsList>
        <ApiProgress pending={lessonsPending} className='h-1 rounded-t-none'></ApiProgress>
        <ul className=''>
          {lessons?.data?.map(lesson => (
            <li key={lesson.id} className='flex p-2 my-3 rounded-md shadow-xl shadow-slate-500'>
              <Link href={`/lesson/${lesson.id}`} target='_blank' className='flex justify-center items-center me-3 overflow-hidden'>
                <img width={280} height={210} src={`http://img.youtube.com/vi/${lesson.src}/0.jpg`} alt={lesson.title} className='transition hover:scale-110'></img>
              </Link>
              <div className='flex flex-col justify-around w-full me-3'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-bold'>
                    <Link href={`/lesson/${lesson.id}`} target='_blank'>
                      <span className='hidden md:inline'>【{lesson.series}】</span>
                      {lesson.title}
                    </Link>
                  </h2>
                  <div className='hidden md:block'>{(new Date(lesson.createTime)).toLocaleDateString()}</div>
                </div>
                <div className='md:flex justify-between'>
                  <div className='space-x-2'>
                    {lesson.tags?.split(',')?.map((tag, i) => (
                      <Link href={`/lesson/list?tag=${tag}`} key={tag + i}>
                        <Badge>{tag}</Badge>
                      </Link>
                    ))}
                  </div>
                  {/* <div className='space-x-2'>
                    <span>點讚：{lesson.goods}</span>
                    <span>曝光：{lesson.views}</span>
                  </div> */}
                  <Link href={`/lesson/${lesson.id}`} target='_blank' className='block mt-2 md:mt-0 text-slate-300 font-bold hover:underline'>前往課程&gt;&gt;</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Pagination totalPage={lessons?.totalPage ?? 0} className='flex justify-center my-5'></Pagination>
      </Tabs>
    </>
  );
};

export default page;
