"use client";
import { useState, type FC, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Facebook, Link, Twitter } from 'lucide-react';
import LineIcon from '@/assets/images/LINE_Brand_icon.webp';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useCopy from '@/hooks/useCopy';

interface Props {
  url?: string;
  shareText?: string;
}

const Share: FC<Props> = ({ url, shareText = '對程式開發感興趣？想讓自己的前端水平更上一層樓？來看看吧！從基礎語法、實戰開發到進階知識，盡在檸檬森林～' }) => {
  const [origin, setOrigin] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const searchParam = useSearchParams();
  if (!url) url = searchParam.size ? pathname + '?' + searchParam : pathname;
  const shareUrl = origin + url;

  const copy = useCopy();

  useEffect(() => {
    setOrigin(location.origin);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) setIsMobile(true);
  }, []);

  return (
    <>
      <ul className='flex'>分享
        <li className='ms-2'><a onClick={() => copy(shareUrl)} className='cursor-pointer'><Link /></a></li>
        <li className='ms-2'><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target='_blank'><Facebook /></a></li>
        <li className='ms-2'><a href={isMobile ? `https://line.naver.jp/R/msg/text/?${encodeURIComponent(shareText + shareUrl)}` : `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target='_blank'><Image src={LineIcon} alt='line' width={24} height={24} /></a></li>
        <li className='ms-2'><a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}&via=檸檬森林`} target='_blank'><Twitter /></a></li>
      </ul>
    </>
  );
};

export default Share;