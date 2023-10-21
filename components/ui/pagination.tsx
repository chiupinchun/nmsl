import { useState, type FC, useMemo, MouseEventHandler } from 'react';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

const variant = {
  default: '',
  active: 'bg-slate-700',
  disabled: 'cursor-not-allowed hover:bg-inherit',
  notLink: 'border-0 cursor-default hover:bg-inherit'
};
const pageVariants = cva(
  'flex justify-center items-center h-10 w-10 rounded-sm border-2 hover:bg-slate-900',
  {
    variants: {
      variant
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

const PageItem: FC<{
  toPage: number;
  searchParam?: string | null;
  action: (page: number) => void;
  variant?: keyof typeof variant | null | undefined;
  children: React.ReactNode;
}> = ({ toPage, searchParam = 'page', action, variant, children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const params = new URLSearchParams(searchParams);
  searchParam && params.set(searchParam, `${toPage}`);
  const href = searchParam ? pathname + '?' + params.toString() : '';

  const onLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!searchParam) e.preventDefault();
    action(toPage);
  };

  return <li><Link href={href} onClick={onLinkClick} className={pageVariants({ variant })}>{children}</Link></li>;
};

interface Props {
  totalPage: number;
  range?: number;
  searchParam?: string | null;
  onChange?: (page?: number) => void;
  className?: string;
}
const page: FC<Props> = (props) => {
  const {
    totalPage,
    searchParam,
    range = 3,
    className
  } = props;

  const searchParams = useSearchParams();

  const [currentPage, changePage] = useState<number>(
    Number((searchParam && searchParams.get(searchParam)) ?? 1)
  );
  const action = (page: number) => {
    changePage(page);
    props.onChange?.(page);
  };

  const pagesInRange = useMemo(() => {
    const result: number[] = [];

    const from = Math.max(currentPage - Math.floor((range - 1) / 2), 1);
    const to = Math.min(currentPage + Math.ceil((range - 1) / 2), totalPage);

    for (let i = from; i <= to; i++) result.push(i);

    return result;
  }, [currentPage, totalPage, range]);


  return (
    <nav className={cn(className)}>
      <ul className='flex space-x-2'>
        <PageItem {...props} action={action} variant={currentPage === 1 ? 'disabled' : null} toPage={Math.max(currentPage - 1, 1)}>&lt;</PageItem>
        {pagesInRange[0] > 1 && <PageItem {...props} action={action} toPage={1}>1</PageItem>}
        {pagesInRange[0] > 2 && <li><span className={pageVariants({ variant: 'notLink' })}>...</span></li>}

        {pagesInRange.map(page => (
          // <li key={page}><Link href='' className={pageVariants({ variant: currentPage === page ? 'active' : null })}>{page}</Link></li>
          <PageItem {...props} action={action} key={page} toPage={page} variant={currentPage === page ? 'active' : null}>{page}</PageItem>
        ))}

        {pagesInRange[pagesInRange.length - 1] < totalPage - 1 && <li><span className={pageVariants({ variant: 'notLink' })}>...</span></li>}
        {pagesInRange[pagesInRange.length - 1] < totalPage && <PageItem {...props} action={action} toPage={totalPage}>{totalPage}</PageItem>}
        <PageItem {...props} action={action} toPage={Math.min(currentPage + 1, totalPage)} variant={currentPage === totalPage ? 'disabled' : null}>&gt;</PageItem>
      </ul>
    </nav>
  );
};

export default page;