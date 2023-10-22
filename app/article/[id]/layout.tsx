import { getArticleById } from '@/api/modules/article';
import { editorDataWithoutHtml } from '@/lib/utils';
import type { Metadata, ResolvingMetadata } from 'next';
import BreadCrumbs from '@/components/breadcrumbs';

export async function generateMetadata(
  { params }: { params: { id: string; }; }
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const article = await getArticleById(id);
  const { title, content, type, tech } = article?.data ?? {};

  return {
    title: `【${type}】${title}｜NMSL檸檬森林｜專業前端培訓課程`,
    description: editorDataWithoutHtml(content).slice(0, 60),
    keywords: `電腦,程式,軟體,網頁,IT${type ? `,${type}` : ''}${tech ? `,${tech}` : ''}`
  };
}

export default async function RootLayout({
  children, params
}: {
  children: React.ReactNode;
  params: { id: string; };
}) {
  const article = await getArticleById(params.id, true);
  const { title, content, type, tech } = article?.data ?? {};

  const routes = [
    { title: 'IT好文', href: '/article/list' },
    { title }
  ];

  return <>
    <h1 className='sr-only'>【{type}】{title}</h1>
    <BreadCrumbs routes={routes} />
    {children}
  </>;
}
