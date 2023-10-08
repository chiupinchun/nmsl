import { Lesson } from '@/api/modules/lesson';
import Link from 'next/link';
import type { FC } from 'react';
import { Badge } from '@/components/ui/badge';

interface Props {
  data: Lesson;
}

const page: FC<Props> = ({ data }) => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>【{data.series}】 {data.title} - {data.author}</h2>
        <div className='flex space-x-3'>
          <div>點讚：{data.goods}</div>
          <div>曝光：{data.views}</div>
        </div>
      </div>
      <div className='flex justify-between items-center my-3'>
        <div className='space-x-2'>
          {data.tags?.split(',')?.map((tag, i) => (
            <Link href={`/lesson/list?tag=${tag}`} key={tag + i}>
              <Badge>{tag}</Badge>
            </Link>
          ))}
        </div>
        <div>
          <div>{new Date(data.createTime).toLocaleString()}</div>
        </div>
      </div>
    </>
  );
};

export default page;