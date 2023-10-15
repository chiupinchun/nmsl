import type { Metadata } from 'next';

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

  return children;
}
