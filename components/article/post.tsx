"use client";
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useState, type FC } from 'react';
import { Textarea } from '../ui/textarea';
import { cn, marked } from '@/lib/utils';
import { postArticle, typeOptions, techOptions, PostArticlePayload } from '@/api/modules/article';
import { request } from '@/api/core';
import { useToast } from '../ui/use-toast';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from '@/store';
import Link from 'next/link';

interface Props {
  rawData?: Partial<PostArticlePayload>;
  onSubmit: (payload: PostArticlePayload) => Promise<boolean | undefined>;
  onCancel: () => void;
  className?: string;
}

const page: FC<Props> = ({
  className, onSubmit, onCancel, rawData = {}
}) => {
  const user = useSelector(state => state.user);
  const { toast } = useToast();

  const data = {
    type: rawData.type ?? '技術',
    title: rawData.title ?? '',
    content: rawData.content ?? '',
    tech: rawData.tech
  };

  const [type, setType] = useState<typeof typeOptions[number]>(data.type);
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [tech, setTech] = useState<typeof techOptions[number] | undefined>(data.tech);

  const [previewMode, setPreviewMode] = useState(false);

  const reset = () => {
    setType(data.type);
    setTitle(data.title);
    setContent(data.content);
    setTech(data.tech);
    setPreviewMode(false);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const submit = async () => {
    if (!content.trim()) return toast({ variant: 'destructive', description: '未輸入內容。' });

    if (await onSubmit({
      title, type, tech,
      content: content.trim()
    })) {
      reset();
    }
  };

  if (!user.id) return (
    <section className='fixed right-5 top-16'>
      <Link href='/login?redirect=/article/list' className='block p-3 bg-white rounded-xl border text-black'>登入後發文</Link>
    </section>
  );

  return (
    <>
      <form onSubmit={e => e.preventDefault()} className={cn('overflow-y-auto scroll-bar', className)}>
        <div className='md:flex'>
          <Select value={type} onValueChange={(value) => setType(value as typeof typeOptions[number])}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map(type => <SelectItem value={type} key={type}>{type}</SelectItem>)}
            </SelectContent>
          </Select>

          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='標題' className='block mt-2 md:mt-0 md:ms-2'></Input>
        </div>
        <div className='md:flex justify-between items-center my-5'>
          <label htmlFor='editor'>
            文章內容
          </label>
          <Select value={tech} onValueChange={(value) => setTech(value as typeof techOptions[number])}>
            <SelectTrigger className="mt-2 md:mt-0 md:w-[180px]">
              <SelectValue placeholder="使用技術" />
            </SelectTrigger>
            <SelectContent className='max-h-48 overflow-y-auto scroll-bar'>
              {techOptions.map(type => <SelectItem value={type} key={type}>{type}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        {previewMode ? <div className='my-5 p-2 max-h-96 overflow-auto markdown-body scroll-bar' dangerouslySetInnerHTML={{ __html: marked(content) }} /> : <Textarea rows={10} placeholder='支援markdown語法' className='my-5' value={content} onChange={e => setContent(e.target.value)} id='editor' />}
        <div className='flex justify-between'>
          <Button onClick={() => setPreviewMode(!previewMode)} variant='ghost'>預覽</Button>
          <div>
            <Button onClick={cancel} variant='destructive' className='me-5'>取消</Button>
            <Button onClick={submit}>送出</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default page;