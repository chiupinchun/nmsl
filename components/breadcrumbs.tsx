"use client";
import { Home } from 'lucide-react';
import Link from 'next/link';
import { Fragment, type FC } from 'react';

interface Props {
  routes: {
    title: string;
    href?: string;
  }[];
}

const page: FC<Props> = ({ routes }) => {
  return (
    <>
      <ul className='flex items-center relative my-3 ps-12 pe-4 h-10 w-min overflow-hidden border border-slate-700 rounded-xl'>
        <li className='absolute z-10 left-2 px-2 bg-[hsl(var(--background))]'>
          <Link href='/'><Home height={18} width={18} /></Link>
        </li>
        {'／'}
        {routes.map((route, idx) => (
          <Fragment key={idx}>
            <li className='px-2 w-max' style={{ zIndex: 9 - idx }}>
              <Link href={route.href ?? ''} onClick={(e) => route.href || e.preventDefault()} className=''>{route.title}</Link>
            </li>
            {idx < routes.length - 1 && '／'}
          </Fragment>
        ))}
      </ul>
    </>
  );
};

export default page;