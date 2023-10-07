"use client";
import { useRouter } from '@/hooks/useRouter';
import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';

interface Props { }

const page: FC<Props> = ({ }) => {
  const router = useRouter();
  const query = useSearchParams();
  return (
    <>
      <h1 className='sr-only'></h1>
      <button onClick={() => router.push({ query: { type: query.get('type') === '1' ? '2' : '1' } })}>push</button>
    </>
  );
};

export default page;