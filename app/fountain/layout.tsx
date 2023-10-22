import type { Metadata } from 'next';
import Breadcrumbs from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: '課程許願池｜NMSL檸檬森林｜專業前端培訓課程',
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
      <h1 className='sr-only'>許願池</h1>
      <Breadcrumbs routes={[{ title: '課程許願池' }]} />
      {children}
    </>
  );
}
