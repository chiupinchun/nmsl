"use client";
import { useState, type FC, KeyboardEventHandler } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";

interface Props {
  children?: React.ReactNode;
  className?: string;
  onSubmit?: (payload: { content: string, tags: string[]; }) => boolean | void | Promise<boolean | void>;
}

const page: FC<Props> = ({
  onSubmit = () => { },
  className, children
}) => {
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
    if (await onSubmit({ content, tags })) setContent('');
  };

  return (
    <>
      <div className={cn('p-5 border border-slate-500 rounded-sm', className)}>
        <label className='block'>留言
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
        {children && (
          <>
            <hr className='my-5' />
            {children}
          </>
        )}
      </div>
    </>
  );
};

export default page;