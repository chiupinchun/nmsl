import { getUserInfo } from '@/api/modules/user';
import { editorDataWithoutHtml } from '@/lib/utils';
import type { Metadata, ResolvingMetadata } from 'next';
import BreadCrumbs from '@/components/breadcrumbs';
import Resume from '@/components/resume';

export async function generateMetadata(
  { params }: { params: { id: string; }; }
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const { data: user } = await getUserInfo(id, true);

  return {
    title: `${user.name}的履歷｜NMSL檸檬森林｜專業前端培訓課程`,
    description: user.description,
    keywords: user.techs
  };
}

export default async function RootLayout({
  children, params
}: {
  children: React.ReactNode;
  params: { id: string; };
}) {
  const { data: user } = await getUserInfo(params.id, true);

  const routes = [
    { title: 'IT好文', href: '/article/list' },
    { title: `${user.name}的履歷` }
  ];

  return <>
    <h1 className='sr-only'>{user.name}的履歷</h1>
    <main className='container pt-3'>
      <BreadCrumbs routes={routes} />
      <Resume userInfo={user} />
      <section>
        <h2 className='my-5 text-xl font-bold text-center'>{user.name}的發文</h2>
        {children}
      </section>
    </main>
  </>;
}
