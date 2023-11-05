"use client";
import { cn } from '@/lib/utils';
import { useState, type FC, useEffect, useCallback } from 'react';
import Image from 'next/image';
import hatoImg from '@/assets/images/hato2.webp';
import { Badge } from '../ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props { }

const page: FC<Props> = ({ }) => {

  const skills = [
    {
      name: 'Nuxt',
      describe: '基於Vue.js的SSR（Server Side Rendering）框架。<br />在保留Vue單頁面應用的效能優勢的同時，能於首次訪問頁面時在伺服器端生成html，以利SEO優化。'
    },
    {
      name: 'Next.js',
      describe: '基於React的SSR框架。<br />與Nuxt相同，能夠兼顧單頁面應用的效能優勢及SEO優化。'
    },
    {
      name: 'TypeScript',
      describe: 'JavaScript獲得完善的類型提示的版本。<br />由於其具備完善的類型提示，不僅可以使項目更好維護，更能在使用陌生工具時快速上手，目前已成為多數開源庫的默認選項。'
    },
    {
      name: 'NestJS',
      describe: '基於express，有良好TypeScript支持的後端框架。<br />語法相似於Angular，有規範的模塊化、大量使用TypeScript的裝飾器等特點。'
    }
  ];

  enum Process {
    PREPARE,
    TITLE,
    SUBTITLE,
    DESCRIBE
  }
  const [process, setProcess] = useState(Process.PREPARE);

  useEffect(() => {
    setTimeout(() => {
      if (process < Process.DESCRIBE) {
        setProcess(process + 1);
      }
    }, process ? 500 : 100);
  }, [process]);

  return (
    <>
      <div className='flex flex-col md:justify-center items-center md:h-[500px]'>
        <h1 className={cn('text-2xl font-bold transition-all duration-500', process >= Process.TITLE ? '' : 'me-[50vw] opacity-0')}>NMSL檸檬森林</h1>
        <h2 className={cn('text-xl font-bold transition-all duration-500', process >= Process.SUBTITLE ? '' : 'ms-[25vw] opacity-0')}>專業前端培訓</h2>
        <div className={cn('md:flex transition-all duration-500', process >= Process.DESCRIBE ? '' : 'scale-0 opacity-0')}>
          <Image src={hatoImg} alt='Hato' width={hatoImg.width} height={hatoImg.height} priority className='mx-auto md:mx-0'></Image>
          <div className='md:ms-3'>
            <h3>講師：Hato</h3>
            <ul className='my-3'>
              <li>2022年8月從前端工程師培訓機構結訓。</li>
              <li>2022年9月於1111人力銀行任職前端工程師。</li>
              <li>2023年6月起開始管理5人小團隊。</li>
              <li>2023年8月正式升為主任。</li>
              <li>略懂Vue3源碼，精通Nuxt、Vue、Next、React、Nest、TypeScript的單詞拼寫。</li>
            </ul>
            <div className='p-2 border border-slate-700 rounded'>
              <h4 className='mb-1'>專業技能</h4>
              <ul className='flex space-x-2'>
                {skills.map(skill => (
                  <li key={skill.name}>
                    <Badge>
                      <Popover>
                        <PopoverTrigger>{skill.name}</PopoverTrigger>
                        <PopoverContent dangerouslySetInnerHTML={{ __html: skill.describe }} />
                      </Popover>
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;