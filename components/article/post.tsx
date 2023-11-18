"use client";
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useState, type FC } from 'react';
import { Textarea } from '../ui/textarea';
import { cn, marked } from '@/lib/utils';
import { postArticle, typeOptions, techOptions } from '@/api/modules/article';
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
  refresh: () => void;
}

const page: FC<Props> = ({ refresh }) => {
  const user = useSelector(state => state.user);
  const { toast } = useToast();

  const [showPostBlock, setShowPostBlock] = useState(false);

  const [type, setType] = useState<typeof typeOptions[number]>('技術');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tech, setTech] = useState<typeof techOptions[number]>();

  const [previewMode, setPreviewMode] = useState(false);

  const submit = async () => {
    if (!content.trim()) return toast({ variant: 'destructive', description: '未輸入內容。' });
    const res = await postArticle({
      title, type, tech,
      content: content.trim()
    });
    if (res?.success) {
      toast({ description: '已成功送出。' });
      setContent('');
      setPreviewMode(false);
      setType('技術');
      setShowPostBlock(false);
      refresh();
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤！' });
  };

  if (!user.id) return (
    <section className='fixed right-5 top-16'>
      <Link href='/login?redirect=/article/list' className='block p-3 bg-white rounded-xl border text-black'>登入後發文</Link>
    </section>
  );

  return (
    <>
      <section className='fixed right-5 top-16'>
        <Button onClick={() => setShowPostBlock(!showPostBlock)} className='flex ms-auto w-fit'>
          <span className={cn(showPostBlock ? 'max-w-0' : 'max-w-2xl', 'overflow-hidden transition-all')}>發表文章</span>{showPostBlock ? <Minus width={18} height={18} /> : <Plus width={18} height={18} />}
        </Button>
        <form onSubmit={e => e.preventDefault()} className={cn(showPostBlock ? 'max-w-screen-2xl max-h-screen scale-100' : 'max-w-0 max-h-0 scale-0', 'mt-5 p-5 w-[90vw] md:w-[600px] box-border border rounded-2xl bg-slate-900 overflow-hidden transition-all')}>
          <div className='md:flex'>
            <Select value={type} onValueChange={(value) => setType(value as typeof typeOptions[number])}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map(type => <SelectItem value={type} key={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>

            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='標題' className='block ms-2'></Input>
          </div>
          <div className='flex justify-between items-center my-5'>
            <label htmlFor='editor'>
              文章內容
            </label>
            <Select value={tech} onValueChange={(value) => setTech(value as typeof techOptions[number])}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="使用技術" />
              </SelectTrigger>
              <SelectContent>
                {techOptions.map(type => <SelectItem value={type} key={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {previewMode ? <div className='markdown-body' dangerouslySetInnerHTML={{ __html: marked(content) }} /> : <Textarea rows={10} placeholder='支援markdown語法' className='my-5' value={content} onChange={e => setContent(e.target.value)} id='editor' />}
          <div className='flex justify-between'>
            <Button onClick={() => setPreviewMode(!previewMode)} variant='ghost'>預覽</Button>
            <Button onClick={submit}>發文</Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default page;