"use client";
import Link from 'next/link';
import type { FC } from 'react';
import config from './config';
import useCookie from '@/hooks/useCookie';

interface Props { }

const page: FC<Props> = ({ }) => {
  const [token, setToken] = useCookie('token');

  return (
    <>
      <header className='fixed z-20 top-0 w-full border-b-2 border-slate-500 shadow-sm shadow-slate-500 bg-black bg-opacity-75'>
        <ul className='flex items-center container'>
          <li className='me-auto'>
            <h2><Link href='/'>NMSL檸檬森林</Link></h2>
          </li>
          {config.list.map((item, idx) => (
            <li key={idx}>
              <Link href={item.href} className='flex items-center px-3 h-header-height'>{item.title}</Link>
            </li>
          ))}
          <li>
            {
              token ?
                <a onClick={(e) => { e.preventDefault(); setToken(null); }} className='block px-3 py-2' href="">登出</a> :
                <Link href='/login' className='block px-3 py-2'>登入</Link>
            }
          </li>
        </ul>
      </header>
    </>
  );
};

export default page;