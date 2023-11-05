import type { Metadata } from 'next';
import BreadCrumbs from '@/components/breadcrumbs';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: '優秀人才｜NMSL檸檬森林｜專業前端培訓課程',
    description: '',
    keywords: '電腦,程式,軟體,網頁,IT,文章,技術,徵才,技術交流'
  };
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const routes = [
    { title: '優秀人才', href: '/resume/list' }
  ];

  return <>
    <h1 className='sr-only'>優秀人才</h1>
    <main className='container pt-3'>
      <BreadCrumbs routes={routes} />
      {children}
    </main>
  </>;
}
