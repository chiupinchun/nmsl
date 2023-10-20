"use client";
import { getArticles } from '@/api/modules/article';
import Post from '@/components/article/post';
import useFetch from '@/hooks/useFetch';
import { type FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import { marked } from '@/lib/utils';

interface Props { }

const page: FC<Props> = ({ }) => {
  const { data: articles, refresh } = useFetch(
    () => getArticles()
  );

  return (
    <>
      <h1 className='sr-only'>IT好文</h1>
      <aside className='hidden md:block fixed -mt-3 w-32 bg-slate-900' style={{ height: 'calc(100vh - var(--header-height))' }}></aside>
      <div className='flex justify-center'>
        <section>
          {articles?.data?.map(article => (
            <Card key={article.id} className='relative w-screen md:w-[640px]'>
              <CardHeader>
                <CardTitle><Link href={`/article/${article.id}`}>{article.title}</Link></CardTitle>
                <CardDescription className='flex justify-between'>
                  <span>{article.user.name}</span>
                  <span>{new Date(article.createTime).toLocaleDateString()}</span>
                </CardDescription>
              </CardHeader>
              <CardContent dangerouslySetInnerHTML={{ __html: marked(article.content) }} className='max-h-72 overflow-hidden'></CardContent>
              <CardFooter className='absolute bottom-0 right-2'>
                <Link href={`/article/${article.id}`} className='text-slate-300 font-bold text-lg transition-all hover:text-xl'>完整內容&gt;&gt;</Link>
              </CardFooter>
            </Card>
          ))}
        </section>
        <Post refresh={refresh} />
      </div>
    </>
  );
};

export default page;