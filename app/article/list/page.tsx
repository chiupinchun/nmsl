"use client";
import { getArticles, techOptions, typeOptions } from '@/api/modules/article';
import Post from '@/components/article/post';
import useFetch from '@/hooks/useFetch';
import { useState, type FC, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';
import { cn, marked } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import ArticleCard from '@/components/article/card';

interface Props {
  searchParams: {
    type?: typeof typeOptions[number];
    tech?: typeof techOptions[number];
  };
}

const page: FC<Props> = ({ searchParams }) => {
  const router = useRouter();

  const [batch, setBatch] = useState(1);

  const { data: articles, refresh } = useFetch(
    () => getArticles({ ...searchParams, show: `${batch * 10}` }),
    [batch, searchParams]
  );

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = document.body.clientHeight - (window.scrollY + window.innerHeight) < 1500;
      const hasMoreArticle = articles?.data && (articles.data.length > (batch - 2) * 10);

      if (nearBottom && hasMoreArticle) {
        setBatch(batch + 1);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [articles?.data?.length, batch]);

  const linkTo = (query: Record<string, string>) => {
    let key: keyof typeof searchParams;
    for (key in searchParams) {
      if (query[key] === searchParams[key]) delete query[key];
      else if (searchParams[key]) query[key] = query[key] ?? searchParams[key]!;
    }
    router.push('/article/list?' + new URLSearchParams(query).toString());
  };

  return (
    <>
      <h1 className='sr-only'>IT好文</h1>
      <aside className='hidden md:block fixed -mt-3 w-48 bg-slate-900' style={{ height: 'calc(100vh - var(--header-height))' }}>
        <Accordion defaultValue={Object.keys(searchParams)} type='multiple' className='px-3'>
          <AccordionItem value="type">
            <AccordionTrigger>文章分類</AccordionTrigger>
            {typeOptions.map(type => (
              <AccordionContent onClick={() => linkTo({ type })} className={cn(searchParams.type === type ? 'bg-slate-800' : '', 'ps-5 cursor-pointer hover:bg-slate-700')} key={type}>{type}</AccordionContent>
            ))}
          </AccordionItem>
          <AccordionItem value="tech">
            <AccordionTrigger>使用技術</AccordionTrigger>
            {techOptions.map(tech => (
              <AccordionContent onClick={() => linkTo({ tech })} className={cn(searchParams.tech === tech ? 'bg-slate-800' : '', 'ps-5 cursor-pointer hover:bg-slate-700')} key={tech}>{tech}</AccordionContent>
            ))}
          </AccordionItem>
        </Accordion>
      </aside>
      <div className='flex justify-center'>
        <section>
          {articles?.data?.map(article => (
            <ArticleCard article={article} key={article.id} className='mb-3 md:w-[640px]' inList />
          ))}
        </section>
        <Post refresh={refresh} />
      </div>
    </>
  );
};

export default page;