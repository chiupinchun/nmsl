import Link from 'next/link';
import type { FC } from 'react';
import config from './config';

interface Props { }

const page: FC<Props> = ({ }) => {
  return (
    <>
      <ul className='flex fixed w-full border-b-2 border-slate-500'>
        {config.list.map(item => (
          <li>
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
        <li className='mx-auto'></li>
        <li>
          <Link href='/login' className='block px-3 py-2'>登入</Link>
        </li>
      </ul>
    </>
  );
};

export default page;