"use client";
import { getPickupLesson, getLessons } from '@/api/modules/lesson';
import Carousel from '@/components/ui/carousel';
import useFetch from '@/hooks/useFetch';
import { useMemo, type FC, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Pagination from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ApiProgress } from '@/components/ui/progress';
import PickupCard from '@/components/lesson/pickupCard';
import Breadcrumbs from '@/components/breadcrumbs';
import { usePathname, useRouter } from 'next/navigation';



interface Props {
  searchParams: { [key: string]: string; };
}
const page: FC<Props> = ({ searchParams }) => {
  const router = useRouter();
  const path = usePathname();
  const querySeries = useMemo(() => searchParams.series ?? '', [searchParams.series]);

  const changeTab = (series: string) => {
    const { series: _series, ...query } = searchParams;

    router.push(
      path + '?' +
      new URLSearchParams(series ? { ...query, series } : query).toString()
    );
  };

  const { data: pickupLessons } = useFetch(getPickupLesson);

  const { data: lessons, pending: lessonsPending } = useFetch(
    () => getLessons(searchParams),
    [searchParams]
  );

  const [keyword, setKeyword] = useState(decodeURIComponent(searchParams.search ?? ''));
  const search = () => {
    router.push(
      path + '?' +
      new URLSearchParams({ ...searchParams, search: keyword, page: '1' }).toString()
    );
  };

  return (
    <>
      <h1 className='sr-only'>課程列表</h1>
      <Breadcrumbs routes={[{ title: '課程列表' }]} />
      <Carousel>
        {[...(pickupLessons?.data?.map(item => (
          <PickupCard data={item} key={item.id}></PickupCard>
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
              <Link href={`/lesson/${lesson.id}`} target='_self' className='flex justify-center items-center me-3 overflow-hidden'>
                <img width={280} height={210} src={`http://img.youtube.com/vi/${lesson.src}/0.jpg`} alt={lesson.title} className='transition hover:scale-110'></img>
              </Link>
              <div className='flex flex-col justify-around w-full me-3'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-xl font-bold'>
                    <Link href={`/lesson/${lesson.id}`} target='_self'>
                      <span className='hidden md:inline'>【{lesson.series}】</span>
                      {lesson.title}
                    </Link>
                  </h2>
                  <div className='hidden md:block'>{(new Date(lesson.createTime)).toLocaleDateString()}</div>
                </div>
                <div className='md:flex justify-between'>
                  <div className='space-x-2'>
                    {lesson.tags?.split(',')?.map((tag, i) => (
                      <Link href={`/lesson/list?search=${tag}`} key={tag + i}>
                        <Badge>{tag}</Badge>
                      </Link>
                    ))}
                  </div>
                  {/* <div className='space-x-2'>
                    <span>點讚：{lesson.goods}</span>
                    <span>曝光：{lesson.views}</span>
                  </div> */}
                  <Link href={`/lesson/${lesson.id}`} target='_self' className='block mt-2 md:mt-0 text-slate-300 font-bold hover:underline'>前往課程&gt;&gt;</Link>
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
