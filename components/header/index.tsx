"use client";
import Link from 'next/link';
import { useState, type FC, type MouseEventHandler } from 'react';
import Image from 'next/image';
import config from './config';
import useCookie from '@/hooks/useCookie';
import { useSelector } from '@/store';
import { useDispatch } from 'react-redux';
import * as actions from '@/store/user';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from 'lucide-react';
import { cn } from '@/lib/utils';
import defaultAvatar from '@/assets/images/defaultAvatar.webp';
import { UserInfo } from '@/api/modules/user';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


const RouteList = ({ className, children }: { className?: string; children?: React.ReactNode; }) => {

  return (
    <ul className={cn(className)}>
      {config.list.map((item, idx) => (
        <li key={idx}>
          <Link href={item.href} className='flex items-center p-3 h-full'>{item.title}</Link>
        </li>
      ))}
      {children}
    </ul>
  );
};

interface Props { }
const page: FC<Props> = ({ }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [_, setToken] = useCookie('token');
  const logout: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    dispatch(actions.logout(undefined));
    setToken(null);
    setOpenMemberPopover(false);
  };

  const [openMemberPopover, setOpenMemberPopover] = useState(false);

  return (
    <>
      <header className='fixed z-20 top-0 w-full border-b-2 border-slate-500 shadow-sm shadow-slate-500 bg-black bg-opacity-75'>
        <nav className='flex items-center justify-between container h-header-height'>
          <h2><Link href='/'>NMSL檸檬森林</Link></h2>
          {/* 電腦 */}
          <RouteList className='hidden md:flex h-full'>
            <li className='hidden md:block'>
              {
                user?.account ?
                  <a className='flex items-center p-3 h-full'>
                    <Popover open={openMemberPopover} onOpenChange={setOpenMemberPopover}>
                      <PopoverTrigger>
                        <Avatar>
                          <AvatarImage src={defaultAvatar.src} />
                          <AvatarFallback>:3</AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>
                      <PopoverContent className='w-fit'>
                        <div>歡迎，{user.name}。</div>
                        <hr className='my-3' />
                        <ul className='flex justify-between space-x-2'>
                          <li><Link href='/member' className='block p-2 border rounded border-slate-500' onClick={() => setOpenMemberPopover(false)}>前往會員中心</Link></li>
                          <li><a onClick={logout} className='block p-2 border rounded border-slate-500 cursor-pointer'>登出</a></li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </a> :
                  <Link href='/login' className='flex items-center p-3 h-full'>點我登入</Link>
              }
            </li>
          </RouteList>

          {/* 手機 */}
          <Sheet>
            <SheetTrigger className='md:hidden'><AlignJustify /></SheetTrigger>
            <SheetContent>
              <SheetHeader className='mt-3 p-3 border-b border-slate-500'>
                {
                  user?.account ?
                    <>
                      <div className='flex items-center space-x-5'>
                        <Avatar>
                          <AvatarImage src={defaultAvatar.src} />
                          <AvatarFallback>:3</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </div>
                      <ul className='flex justify-between space-x-2'>
                        <li><Link href='/member' className='block p-2 border rounded border-slate-500'>前往會員中心</Link></li>
                        <li><a onClick={logout} className='block p-2 border rounded border-slate-500 cursor-pointer'>登出</a></li>
                      </ul>
                    </> :
                    <Link href='/login'>點我登入</Link>
                }
              </SheetHeader>

              <RouteList />
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </>
  );
};

export default page;