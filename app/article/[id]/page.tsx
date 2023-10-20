"use client";
import { getArticle } from '@/api/modules/article';
import useFetch from '@/hooks/useFetch';
import type { FC } from 'react';

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined; };
}

const page: FC<Props> = ({ params, searchParams }) => {
  console.log(searchParams);

  const { data: article, refresh } = useFetch(
    () => getArticle(params.id)
  );

  return (
    <>
      <h1 className='sr-only'>{article?.data?.title}</h1>

    </>
  );
};

export default page;