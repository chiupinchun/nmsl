"use client";
import { Article, getArticles } from '@/api/modules/article';
import { Waterfall } from '@/components/ui/waterfall';
import ArticleCard from '@/components/article/card';
import { type FC } from 'react';

interface Props {
  params: { id: string; };
}
const ResumePage: FC<Props> = async ({ params }) => {

  return (
    <>
      <Waterfall
        query={{ user: params.id }}
        fetcher={getArticles}
        render={(articles) => (
          articles?.map((article: Article) => (
            <li key={article.id}><ArticleCard article={article} className='mb-3 w-full h-80 overflow-hidden' inList /></li>
          ))
        )}
        className='grid grid-cols-3 gap-5'
      />
    </>
  );
};

export default ResumePage;