"use client";
import { PostArticlePayload, getArticles, postArticle, techOptions, typeOptions } from '@/api/modules/article';
import Post from '@/components/article/post';
import useFetch from '@/hooks/useFetch';
import { useState, type FC, useEffect } from 'react';
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
import BreadCrumbs from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  searchParams: {
    type?: typeof typeOptions[number];
    tech?: typeof techOptions[number];
  };
}

const page: FC<Props> = ({ searchParams }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [batch, setBatch] = useState(1);

  const { data: articles, refresh } = useFetch(
    () => getArticles({ ...searchParams, show: `${batch * 10}` }),
    [batch, searchParams]
  );

  const [showPostBlock, setShowPostBlock] = useState(false);

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

  const onPost = async (payload: PostArticlePayload) => {
    const res = await postArticle(payload);
    if (res?.success) {
      toast({ description: '已成功送出。' });

      setShowPostBlock(false);
      refresh();

      return true;
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤！' });
  };

  return (
    <>
      <aside className='hidden md:block fixed -mt-3 w-48 h-noheader-screen bg-slate-900'>
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
          <BreadCrumbs routes={[{ title: 'IT好文' }]} />
          <ul>
            {articles?.data?.map(article => (
              <li key={article.id}><ArticleCard article={article} className='mb-3 md:w-[640px]' inList /></li>
            ))}
          </ul>
        </section>
        <section className='fixed right-5 top-16'>
          <Button onClick={() => setShowPostBlock(!showPostBlock)} className='flex ms-auto w-fit'>
            <span className={cn(showPostBlock ? 'max-w-0' : 'max-w-2xl', 'overflow-hidden transition-all')}>發表文章</span>{showPostBlock ? <Minus width={18} height={18} /> : <Plus width={18} height={18} />}
          </Button>
          <Post onSubmit={onPost} onCancel={() => setShowPostBlock(false)} className={cn(showPostBlock ? 'max-w-screen-2xl max-h-screen scale-100' : 'max-w-0 max-h-0 scale-0', 'mt-5 p-5 w-[90vw] md:w-[600px] box-border border rounded-2xl bg-slate-900 overflow-hidden transition-all')} />
        </section>
      </div>
    </>
  );
};

export default page;