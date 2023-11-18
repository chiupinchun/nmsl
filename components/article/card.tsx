import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { Article } from '@/api/modules/article';
import { Badge } from '../ui/badge';
import { cn, marked } from '@/lib/utils';

interface Props {
  article: Article;
  className?: string;
  inList?: boolean;
}

const page: FC<Props> = ({ article, className, inList }) => {
  return (
    <>
      <Card className={cn('relative w-screen', className)}>
        <CardHeader>
          <CardTitle className='flex justify-between items-center'>
            <Link href={`/article/${article.id}`}>【{article.type}】{article.title}</Link>
            {article.tech && <Badge className='cursor-pointer'><Link href={`/article/list?tech=${article.tech}`}>{article.tech}</Link></Badge>}
          </CardTitle>
          <CardDescription className='flex justify-between'>
            <span>{article.user.name}</span>
            <span>{new Date(article.createTime).toLocaleDateString()}</span>
          </CardDescription>
        </CardHeader>
        <CardContent dangerouslySetInnerHTML={{ __html: marked(article.content) }} className={cn(inList ? 'max-h-72 overflow-hidden' : '', 'markdown-body')}></CardContent>
        {inList && <CardFooter className='absolute bottom-0 right-2'>
          <Link href={`/article/${article.id}`} className='p-2 bg-slate-900 rounded-xl text-slate-300 font-bold text-sm transition-all hover:text-base'>完整內容&gt;&gt;</Link>
        </CardFooter>}
      </Card>
    </>
  );
};

export default page;