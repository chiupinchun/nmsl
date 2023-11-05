"use client";
import Link from 'next/link';
import type { FC } from 'react';
import Image from 'next/image';
import fountainPreview from '@/assets/images/fountain.webp';
import useFetch from '@/hooks/useFetch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArticleCard from '@/components/article/card';
import { getArticles } from '@/api/modules/article';

interface Props { }

const page: FC<Props> = ({ }) => {
  const { data: articles } = useFetch(
    () => getArticles({ show: '5' })
  );

  return (
    <>
      <h2 className='my-10 md:mx-auto px-10 py-3 w-fit bg-slate-500 text-xl font-bold bg-gradient-to-r from-slate-400 to-slate-700'>學習資源</h2>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5'>
        {articles?.data?.length && (
          <>
            {articles.data.map(article => (
              <li key={article.id} className=''>
                <ArticleCard article={article} key={article.id} className='w-[unset] h-72' inList />
              </li>
            ))}
            <li>
              <Card className='h-72'>
                <CardHeader>沒找到需要的資源？</CardHeader>
                <CardContent>
                  <figure className='relative'>
                    <Image src={fountainPreview} width={0} height={0} alt='許願池' className=''></Image>
                    <figcaption className='absolute top-0 flex justify-center items-center w-full h-full bg-slate-700 transition-all bg-opacity-50'>
                      <Link href='/fountain' className='px-4 py-2 border border-slate-900 rounded-3xl bg-slate-700 hover:bg-slate-900'>前往許願池</Link>
                    </figcaption>
                  </figure>
                </CardContent>
              </Card>
            </li>
          </>
        )}
      </ul>
      <Link href='/lesson/list' className='block mx-auto px-6 py-2 w-fit border border-slate-700 rounded-3xl hover:bg-slate-900'>更多文章</Link>
    </>
  );
};

export default page;