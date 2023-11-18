"use client";
import { useState, type FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { type Article, deleteArticle as _deleteArticle } from '@/api/modules/article';
import { Badge } from '../ui/badge';
import { cn, marked } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from 'lucide-react';
import { useSelector } from '@/store';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

interface Props {
  article: Article;
  className?: string;
  inList?: boolean;
  changeMode?: () => void;
}

const page: FC<Props> = ({ article, className, inList, changeMode }) => {
  const router = useRouter();
  const user = useSelector(state => state.user);
  const { toast } = useToast();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteArticle = async () => {
    const res = await _deleteArticle(article.id);
    if (res?.success) {
      toast({ description: '刪除成功' });
      router.push('/article/list');
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤！' });
  };

  return (
    <>
      <Card className={cn('relative w-screen', className)}>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <CardTitle><Link href={`/article/${article.id}`}>【{article.type}】{article.title}</Link></CardTitle>
              {
                user?.id === article.user.id && changeMode && (
                  <Popover>
                    <PopoverTrigger>
                      <Pencil className='ms-2 cursor-pointer' size='20' />
                    </PopoverTrigger>
                    <PopoverContent className='w-[unset]'>
                      <Button onClick={changeMode} className='me-3'>編輯</Button>
                      <Button onClick={() => setShowDeleteDialog(true)} variant='destructive'>刪除</Button>
                    </PopoverContent>
                  </Popover>
                )
              }
            </div>
            {article.tech && <Badge className='cursor-pointer'><Link href={`/article/list?tech=${article.tech}`}>{article.tech}</Link></Badge>}
          </div>
          <CardDescription className='flex justify-between'>
            <Link href={`/resume/${article.user.id}`}>{article.user.name}</Link>
            <span>{new Date(article.createTime).toLocaleDateString()}</span>
          </CardDescription>
        </CardHeader>
        <CardContent dangerouslySetInnerHTML={{ __html: marked(article.content) }} className={cn(inList ? 'max-h-72 overflow-hidden' : '', 'markdown-body')}></CardContent>
        {inList && <CardFooter className='absolute bottom-0 right-2'>
          <Link href={`/article/${article.id}`} className='p-2 bg-slate-900 rounded-xl text-slate-300 font-bold text-sm transition-all hover:text-base'>完整內容&gt;&gt;</Link>
        </CardFooter>}
      </Card>
      <Dialog open={showDeleteDialog} onOpenChange={show => setShowDeleteDialog(show)}>
        <DialogContent>
          <DialogHeader>確定要刪除文章嗎？</DialogHeader>
          <DialogDescription>刪除後將不可復原，請謹慎選擇。</DialogDescription>
          <div className='flex space-x-5'>
            <Button onClick={deleteArticle} variant='destructive'>刪除</Button>
            <Button onClick={() => setShowDeleteDialog(false)}>取消</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default page;