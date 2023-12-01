"use client";
import { Lesson } from '@/api/modules/lesson';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState, type FC, useMemo } from 'react';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';

interface Props {
  lesson?: Lesson;
  list?: Lesson[];
  video: number;
}

const Neighbor: FC<Props> = ({ lesson, list, video }) => {
  const neighbor = useMemo(() => {
    type LinkLike = { lesson: Lesson; video: number; };
    const result: {
      prev: LinkLike | null;
      next: LinkLike | null;
    } = {
      prev: null,
      next: null
    };
    if (lesson?.id && list?.length && video !== undefined) {
      const videos: LinkLike[] = [];
      let found = false;
      for (let i = 0; i < list.length; i++) {
        const currentLeson = list[i];
        if (currentLeson?.src) {
          const length = currentLeson.src.split(',').length;
          for (let j = 0; j < length; j++) {
            if (found) {
              result.next = { lesson: currentLeson, video: j };
              break;
            } else if (currentLeson.id === lesson.id && j === video) {
              result.prev = videos[videos.length - 1];
              found = true;
            }
            videos.push({ lesson: currentLeson, video: j });
          }
        }
      }
    }

    return result;
  }, [lesson?.id, list?.length, video]);

  const [showNeighborBlock, setShowNeighborBlock] = useState(true);

  if (!neighbor.prev && !neighbor.next) return null;

  return (
    <>
      <ul className={cn('flex justify-between py-2 overflow-hidden transition-all duration-300', showNeighborBlock ? 'max-h-48 scale-y-100' : 'max-h-0 scale-y-0')}>
        <li>{neighbor.prev && (
          <div className='p-1 md:p-2 border rounded border-slate-700'>
            <h4 className='hidden md:block'>
              {neighbor.prev.lesson.title} - 第{neighbor.prev.video + 1}集
            </h4>
            <Link href={`/lesson/${neighbor.prev.lesson.id}?video=${neighbor.prev.video}`} className='block me-auto py-1 md:py-2 w-fit'>&lt;&lt; 上一集</Link>
          </div>
        )}</li>
        <li>{neighbor.next && (
          <div className='p-1 md:p-2 border rounded border-slate-700'>
            <h4 className='hidden md:block'>
              {neighbor.next.lesson.title} - 第{neighbor.next.video + 1}集
            </h4>
            <Link href={`/lesson/${neighbor.next.lesson.id}?video=${neighbor.next.video}`} className='block ms-auto py-1 md:py-2 w-fit'>下一集 &gt;&gt;</Link>
          </div>
        )}</li>
      </ul>
      <div className='flex justify-center absolute -bottom-2 w-full'>
        <Button onClick={() => setShowNeighborBlock(!showNeighborBlock)} className='h-3'><ChevronDown className={cn(showNeighborBlock ? 'rotate-180' : '', 'transition')} /></Button>
      </div>
    </>
  );
};

export default Neighbor;