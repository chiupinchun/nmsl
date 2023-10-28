import Link from 'next/link';
import type { FC } from 'react';

interface Props { }

const page: FC<Props> = ({ }) => {
  return (
    <>
      <h2 className='mt-5 text-xl font-bold'>沒找到想看的課程？你可以——</h2>
      <div className='my-5 space-x-5'>
        <Link href='/fountain' className='px-4 py-2 border border-slate-700 rounded-3xl hover:bg-slate-900'>點我去許願</Link>
      </div>
    </>
  );
};

export default page;