import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'IT好文｜NMSL檸檬森林｜專業前端培訓課程',
    description: '',
    keywords: '電腦,程式,軟體,網頁,IT,文章,技術,徵才,發問'
  };
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return <>
    <h1 className='sr-only'>IT好文</h1>
    <main className='container pt-3'>
      {children}
    </main>
  </>;
}
