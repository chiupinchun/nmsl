import type { Metadata } from 'next';
import Breadcrumbs from '@/components/breadcrumbs';
import NightSky from '@/components/r3f/nightSky';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <h1 className='sr-only'>NMSL檸檬森林｜專業前端培訓課程</h1>
      <div className='fixed pt-3 w-screen h-noheader-screen'>
        {/* <NightSky className='hidden md:block' /> */}
      </div>
      <main className='relative z-10 container'>
        {children}
      </main>
    </>
  );
}
