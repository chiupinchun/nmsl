"use client";
import { useState, type FC, useEffect } from 'react';
import Image from 'next/image';
import { Facebook, Link, Twitter } from 'lucide-react';
import LineIcon from '@/assets/images/LINE_Brand_icon.png';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useCopy from '@/hooks/useCopy';

interface Props {
  url?: string;
}

const Share: FC<Props> = ({ url }) => {
  const [origin, setOrigin] = useState('');
  const pathname = usePathname();
  const searchParam = useSearchParams();
  if (!url) url = searchParam.size ? pathname + '?' + searchParam : pathname;
  const shareUrl = origin + url;

  const copy = useCopy();

  useEffect(() => {
    setOrigin(location.origin);
  }, []);

  return (
    <>
      <ul className='flex'>分享
        <li className='ms-2'><a onClick={() => copy(shareUrl)} className='cursor-pointer'><Link /></a></li>
        <li className='ms-2'><a href=""><Facebook /></a></li>
        <li className='ms-2'><a href=""><Image src={LineIcon} alt='line' width={24} height={24} /></a></li>
        <li className='ms-2'><a href=""><Twitter /></a></li>
      </ul>
    </>
  );
};

export default Share;