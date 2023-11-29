"use client";
import { request } from '@/api/core';
import useFetch from '@/hooks/useFetch';
import { cn } from '@/lib/utils';
import loading from '@/assets/images/loading.svg';
import Image from 'next/image';
import { useState, type FC, useEffect } from 'react';

interface Props<Data = any[]> {
  query: Record<string, any>;
  fetcher: (payload: any) => ReturnType<typeof request<Data>>;
  trigger?: boolean;
  render: (data: ReturnType<typeof useFetch<Data>>['data']) => React.ReactNode;
  className?: string;
}

export const Waterfall: FC<Props> = ({
  query, fetcher, trigger, render, className
}) => {
  const [batch, setBatch] = useState(1);

  const { data: list, pending } = useFetch(
    () => fetcher({ ...query, show: `${batch * 10}` }),
    [batch, query, trigger]
  );

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = document.body.clientHeight - (window.scrollY + window.innerHeight) < 1500;
      const hasMoreArticle = list?.data && (list.data?.length > (batch - 2) * 10);

      if (nearBottom && hasMoreArticle) {
        setBatch(batch + 1);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [list?.data?.length, batch]);

  return (
    <>
      <ul className={cn(className)}>
        {list?.data && render(list.data)}
        {pending && <Image src={loading} alt='讀取中' />}
      </ul>
    </>
  );
};