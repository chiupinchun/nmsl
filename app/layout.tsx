import '@/assets/css/global.css';
import '@/assets/css/markdown.css';
import Header from '@/components/header';
import type { Metadata } from 'next';
import InitComponent from '@/app/init';
import Provider from '@/store/provider';
import { Toaster } from '@/components/ui/toaster';
// import { Inter } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NMSL檸檬森林｜專業前端培訓課程',
  description: '',
  keywords: ''
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='dark'>
      <body className='pt-header-height scroll-bar'>
        <Provider>
          <Header></Header>
          {children}
          <InitComponent />
          <Toaster></Toaster>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;