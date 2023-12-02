import Link from 'next/link';
import type { FC } from 'react';

interface Props { }

const page: FC<Props> = ({ }) => {
  return (
    <>
      <div className='flex justify-center items-center h-96 w-screen'>
        <div>
          <p>未公開履歷的使用者。</p>
          <Link href='/'>返回首頁</Link>
        </div>
      </div>
    </>
  );
};

export default page;