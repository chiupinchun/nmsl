"use client";
import { Lesson } from '@/api/modules/lesson';
import Link from 'next/link';
import { useState, type FC, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  data: Lesson;
}

const page: FC<Props> = ({ data }) => {
  const [collected, setCollected] = useState(false);

  useEffect(() => {
    const favLessons = JSON.parse(localStorage.getItem('fav-lessons') ?? '[]');
    setCollected(favLessons.includes(data.id));
  }, []);

  const collect = () => {
    const favLessons = JSON.parse(localStorage.getItem('fav-lessons') ?? '[]');
    const idx = favLessons.indexOf(data.id);
    if (idx > -1) {
      favLessons.splice(idx, 1);
      localStorage.setItem('fav-lessons', JSON.stringify(favLessons));
      setCollected(false);
    } else {
      localStorage.setItem('fav-lessons', JSON.stringify(favLessons.concat(data.id)));
      setCollected(true);
    }
  };

  return (
    <>
      <div className='flex justify-between items-center overflow-hidden'>
        <h2 className='font-bold text-xl'>
          <span className='hidden md:inline'>【{data.series}】 </span>
          {data.title}
          <span className='hidden md:inline'> - {data.author}</span>
        </h2>
        <Star onClick={collect} color='hotpink' fill={collected ? 'hotpink' : undefined} className='cursor-pointer hover:scale-x-110' />
      </div>
      <div className='flex justify-between items-center my-3'>
        <div className='space-x-2'>
          {data.tags?.split(',')?.map((tag, i) => (
            <Link href={`/lesson/list?tag=${tag}`} key={tag + i}>
              <Badge>{tag}</Badge>
            </Link>
          ))}
        </div>
        <div className='hidden md:block'>
          {new Date(data.createTime).toLocaleString()}
        </div>
      </div>
    </>
  );
};

export default page;