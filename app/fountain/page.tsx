"use client";
import { useState, type FC, useEffect } from 'react';
import Screen3d from '@/components/fountain/canvas';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AutoCompleteInput, Input } from '@/components/ui/input';
import { request } from '@/api/core';
import { useToast } from '@/components/ui/use-toast';
import { useSelector } from '@/store';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import { getWishes, postWish } from '@/api/modules/wish';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import loading from '@/assets/images/loading.svg';
import Image from 'next/image';

interface Props { }

const page: FC<Props> = ({ }) => {
  const { toast } = useToast();
  const user = useSelector(state => state.user);

  const [counter, setCounter] = useState(0);
  setTimeout(() => {
    setCounter(counter + 1);
  }, 500);

  const [openWishModal, setOpenWishModal] = useState(false);

  const { data: wishes, pending: wishPending, refresh: refreshWishes } = useFetch(
    () => getWishes()
  );
  const [newWish, setNewWish] = useState('');

  const sendWish = async () => {
    const res = await postWish(newWish);
    console.log(res);
    if (res?.success) {
      toast({ description: '許願成功！' });
      setNewWish('');
      refreshWishes();
      setOpenWishModal(false);
    }
    else {
      toast({
        variant: 'destructive',
        description: res?.message ?? '發生錯誤！'
      });
    }
  };

  return (
    <>
      <h1 className='sr-only'>許願池</h1>
      <section className='py-2'>
        <h2 className='text-xl font-bold'>課程許願池</h2>
        <p>
          想學的IT技術在網上找不到好的教程？<br />
          試試許個願吧～<br />
          說不定願望就實現了哦{counter % 2 ? ' / (｀・ω・´) / ' : ' \\ (*´▽｀*) \\ '}
        </p>
      </section>
      <section className='relative py-2 h-[500px] md:h-[700px] overflow-hidden rounded-sm'>
        <Screen3d></Screen3d>
        <div className='absolute bottom-10 w-full text-center'>
          <Button className='px-10 py-5 rounded-[9999px]' variant='secondary'>
            {user.account ? (
              <span onClick={() => setOpenWishModal(true)}>點我許願</span>
            ) : (
              <Link href='/login?redirect=/fountain'>登入後即可許願</Link>
            )}
          </Button>
        </div>
      </section>

      <section className='py-2'>
        <h2 className='text-xl font-bold'>許願池排行榜</h2>
        <p>
          不知道該許甚麼願？<br />
          看看其他人都許了甚麼吧～
        </p>
        {wishPending ?
          <Image src={loading} alt='讀取中' /> :
          <Table className='my-5 md:mx-auto md:w-2/3'>
            <TableCaption>許願池排行榜</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">名次</TableHead>
                <TableHead>想學的技術</TableHead>
                <TableHead className="text-right">票數</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wishes?.data?.slice(0, 10)?.map((item, idx) => (
                <TableRow key={item.wish}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{item.wish}</TableCell>
                  <TableCell className="text-right">{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </section>

      <Dialog open={openWishModal} onOpenChange={setOpenWishModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>想學甚麼技術呢？</DialogTitle>
            {/* <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription> */}
          </DialogHeader>
          <label className='relative'>許願
            <AutoCompleteInput value={newWish} onChange={setNewWish} autoInputOpts={wishes?.data ? wishes.data.map(item => item.wish) : undefined} className='mt-2'></AutoCompleteInput>
          </label>
          <DialogFooter>
            <Button onClick={sendWish}>許願</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default page;