"use client";
import { request } from '@/api/core';
import { Button } from '@/components/ui/button';
import useFetch from 'swr';
import { useState } from 'react';

export default function Home() {
  const [flag, setFlag] = useState(false);
  const { data } = useFetch<{ message: string; }>(flag + '', () => request('/'), {});

  return (
    <>
      <Button onClick={() => setFlag(!flag)}>{flag ? '☆' : '★'}</Button>
      <p>{data?.message}</p>
    </>
  );
}
