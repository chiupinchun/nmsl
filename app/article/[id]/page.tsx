"use client";
import { getArticle } from '@/api/modules/article';
import useFetch from '@/hooks/useFetch';
import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string; };
}

const page: FC<Props> = (ctx) => {
  const searchParams = useSearchParams();
  console.log(searchParams.values());

  const { data: article, refresh } = useFetch(
    () => getArticle(ctx.params.id)
  );

  return (
    <>
      <h1 className='sr-only'>{article?.data?.title}</h1>

    </>
  );
};

export default page;