import { getLessonById } from '@/api/modules/lesson';
import { editorDataWithoutHtml } from '@/lib/utils';
import type { Metadata, ResolvingMetadata } from 'next';
import BreadCrumbs from '@/components/breadcrumbs';

export async function generateMetadata(
  { params }: { params: { id: string; }; }
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const lesson = await getLessonById(id, true);
  const { title, content, series, tags } = lesson?.data ?? {};

  return {
    title: `【${series}】${title}`,
    description: editorDataWithoutHtml(content).slice(0, 60),
    keywords: `電腦,程式,軟體,網頁,IT${series ? `,${series}` : ''}${tags ? `,${tags}` : ''}`
  };
}

export default async function RootLayout({
  children, params
}: {
  children: React.ReactNode;
  params: { id: string; };
}) {
  const lesson = await getLessonById(params.id, true);
  const { title, content, series, tags } = lesson?.data ?? {};

  const routes = [
    { title: '課程列表', href: '/lesson/list' },
    { title }
  ];

  return <>
    <h1 className='sr-only'>【{series}】{title}</h1>
    <BreadCrumbs routes={routes} />
    {children}
  </>;
}
