"use client";
import { PostArticlePayload, editArticle, getArticleById, getArticles, techOptions } from '@/api/modules/article';
import useFetch from '@/hooks/useFetch';
import { editorDataWithoutHtml } from '@/lib/utils';
import { useState, type FC } from 'react';
import ArticleCard from '@/components/article/card';
import ArticlePost from '@/components/article/post';
import Link from 'next/link';
import Image from 'next/image';
import loading from '@/assets/images/loading.svg';
import Comments from '@/components/comments';
import { request } from '@/api/core';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  params: {
    id: string;
  };
}

const page: FC<Props> = (ctx) => {
  const { toast } = useToast();

  const { data: article, refresh } = useFetch(
    ({ times }) => getArticleById(ctx.params.id, times > 1)
  );

  const { data: pickupArticle, pending: pickupArticlePending } = useFetch(
    async () => {
      if (article?.data?.tech === undefined) return null;

      const simalarArticles = await getArticles({
        tech: article.data.tech as typeof techOptions[number],
        show: '5'
      });
      if (simalarArticles?.data?.length >= 5) return simalarArticles;

      const others = await getArticles({ show: `${5 - (simalarArticles?.data?.length ?? 0)}` });

      if (!simalarArticles.data) simalarArticles.data = [];
      if (!others.data) others.data = [];

      simalarArticles.data = simalarArticles.data.concat(...others.data);
      return simalarArticles;
    },
    [article?.data?.tech]
  );

  const [editMode, setEditMode] = useState(false);

  const onEdit = async (payload: PostArticlePayload) => {
    if (!article?.data) return;
    const res = await editArticle(article.data.id, payload);
    if (res?.success) {
      toast({ description: '已成功送出。' });

      setEditMode(false);
      refresh();

      return true;
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤！' });
  };

  const comment = async (
    payload: { content: string, tags: string[]; }
  ) => {
    if (!article?.data?.id) return;
    const res = await request('/article-comment', {
      method: 'POST',
      body: { ...payload, articleId: article.data.id }
    });
    if (res?.success) {
      toast({ description: '留言成功。' });
      refresh();
      window.scrollTo(0, document.body.scrollHeight);
      return true;
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤！' });
  };

  return (
    <>
      <div className='md:flex items-start relative mb-5'>
        <section className='w-full md:me-5 mb-5 md:mb-0'>
          {article?.data && (
            editMode ?
              <ArticlePost rawData={article.data} onSubmit={onEdit} onCancel={() => setEditMode(false)} /> :
              <ArticleCard article={article.data} className='w-full' changeMode={() => setEditMode(true)} />
          )}
        </section>
        <aside className='md:sticky bottom-0 p-2 w-80 border rounded' style={{ top: 'calc(var(--header-height) + 1rem)' }}>
          <h3 className='text-xl font-bold'>推薦文章</h3>
          {pickupArticlePending ? <Image src={loading} alt='讀取中' priority /> : (
            <ul>
              {pickupArticle?.data?.map(article => (
                <li key={article.id} className='my-2'>
                  <h4><Link href={`/article/${article.id}`}>{article.title}</Link></h4>
                  <p className='overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-400'><Link href={`/article/${article.id}`}>{editorDataWithoutHtml(article.content)}</Link></p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
      {article?.data?.comments && <Comments comments={article.data.comments} onSubmit={comment} />}
    </>
  );
};

export default page;