"use client";
import { Article, getArticles } from '@/api/modules/article';
import { updateUserInfo } from '@/api/modules/user';
import Resume from '@/components/resume';
import ArticleCard from '@/components/article/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useSelector } from '@/store';
import { useState, type FC } from 'react';
import Memo from '@/components/member/memo';
import { Waterfall } from '@/components/ui/waterfall';
import Calendar from '@/components/member/calendar';

interface Props { }
const page: FC<Props> = ({ }) => {
  const user = useSelector(state => state.user);

  const { toast } = useToast();

  const [editMode, setEditMode] = useState(false);

  const save = async () => {
    if (editMode) {
      const res = await updateUserInfo(user);
      if (res.success) toast({ description: '更新成功' });
    }
    setEditMode(!editMode);
  };

  return (
    <>
      <Resume userInfo={user} editMode={editMode}>
        <Button onClick={save} className='w-full'>{editMode ? '儲存' : '編輯'}</Button>
      </Resume>
      <section className='md:flex flex-row-reverse mt-5'>
        <aside className='md:ms-10 md:w-1/2 space-y-5'>
          <h2 className='mb-2 text-xl font-bold text-center'>備忘錄</h2>
          <Memo />
          <h2 className='mb-2 text-xl font-bold text-center'>行事曆</h2>
          <Calendar />
        </aside>
        <aside className='md:w-1/2'>
          <h2 className='mb-2 text-xl font-bold text-center'>我的發文</h2>
          <Waterfall
            query={{ user: user.id }}
            fetcher={getArticles}
            render={(articles) => (
              articles?.map((article: Article) => (
                <li key={article.id}><ArticleCard article={article} className='mb-3 w-full' inList /></li>
              ))
            )}
          />
        </aside>
      </section>
    </>
  );
};

export default page;