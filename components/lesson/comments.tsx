"use client";
import type { FC } from 'react';
import Comment from '@/components/comment';
import { request } from '@/api/core';
import { useToast } from "@/components/ui/use-toast";
import { getComments } from '@/api/modules/lesson';
import useFetch from '@/hooks/useFetch';

interface Props {
  lessonId: number;
}

const page: FC<Props> = ({ lessonId }) => {
  const { toast } = useToast();

  const {
    data: comments,
    refresh: refreshComments,
    pending: commentsPending
  } = useFetch(
    () => getComments({
      lessonId
    })
  );

  const comment = async (
    payload: { content: string, tags: string[]; }
  ) => {
    const res = await request('/lesson-comment', {
      method: 'POST',
      body: { ...payload, lessonId }
    });
    if (res?.success) {
      toast({ description: '留言成功。' });
      refreshComments();
      window.scrollTo(0, document.body.scrollHeight);
      return true;
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤！' });
  };

  return (
    <>
      <Comment onSubmit={comment} className='my-10'>
        <ul>
          {comments ? comments.data.map(comment => (
            <li className='md:flex p-5' key={comment.id}>
              <div className='md:w-1/6'>{comment.user.name}：</div>
              <p className='md:w-5/6'>{comment.content}</p>
            </li>
          )) : (
            <li className='text-center'>
              {commentsPending ? '讀取中...' : '目前沒有留言哦。'}
            </li>
          )}
        </ul>
      </Comment>
    </>
  );
};

export default page;