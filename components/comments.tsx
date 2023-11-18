"use client";
import { useState, type FC, KeyboardEventHandler } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from '@/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Comment } from '@/api/modules/article';

interface Props {
  comments: Comment[] | undefined;
  className?: string;
  commentLabel?: string;
  onSubmit: (payload: { content: string, tags: string[]; }) => boolean | void | Promise<boolean | void>;
}

const page: FC<Props> = ({
  onSubmit = () => { },
  className, comments, commentLabel
}) => {
  const user = useSelector(state => state.user);
  const path = usePathname();

  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const { toast } = useToast();

  const pushNewTag: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter' || !newTag) return;
    if (tags.includes(newTag)) {
      return toast({
        variant: 'destructive',
        description: '重複的tag！'
      });
    }
    setTags(tags.concat(newTag));
    setNewTag('');
  };

  const submit = async () => {
    if (!content) return;
    if (await onSubmit({ content, tags })) setContent('');
  };

  if (!user?.id) return (
    <div className={cn('flex items-center justify-center h-48 border border-slate-500 rounded-sm', className)}>
      <Link href={`/login?redirect=${path}`}>登入</Link>後留言
    </div>
  );

  return (
    <>
      <div className={cn('p-5 border border-slate-500 rounded-sm', className)}>
        <label className='block'>
          {commentLabel ?? '留言'}
          <Textarea placeholder='留個言吧。' className='mt-3' value={content} onChange={e => setContent(e.target.value)}></Textarea>
        </label>
        <div className='flex justify-between mt-5'>
          <ul className='flex space-x-3'>
            {/* {tags.map(tag => (
              <li key={tag}><Badge>{tag}</Badge></li>
            ))}
            <li><Input value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={pushNewTag}></Input></li> */}
          </ul>
          <Button onClick={submit}>送出</Button>
        </div>
        <hr className='my-5' />
        <ul>
          {comments?.length ? comments.map(comment => (
            <li className='md:flex p-5' key={comment.id}>
              <div className='md:w-1/6'>{comment.user.name}：</div>
              <p className='md:w-5/6'>{comment.content}</p>
            </li>
          )) : (
            <li className='text-center'>
              {comments ? '目前沒有留言哦。' : '讀取中...'}
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default page;