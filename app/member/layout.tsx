import type { Metadata } from 'next';
import Breadcrumbs from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: '會員中心｜NMSL檸檬森林｜專業前端培訓課程',
  description: '',
  keywords: ''
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <main className='container pt-3'>
        <Breadcrumbs routes={[{ title: '會員中心' }]} />
        {children}
      </main>
    </>
  );
}
