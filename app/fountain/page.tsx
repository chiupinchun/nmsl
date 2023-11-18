"use client";
import { useState, type FC } from 'react';
// import Screen3d from '@/components/fountain/canvas';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AutoCompleteInput, Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useSelector } from '@/store';
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import { getWishes, postWish } from '@/api/modules/wish';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import loading from '@/assets/images/loading.svg';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dynamic from 'next/dynamic';

// const Screen3d = lazy(() => import('@/components/fountain/canvas'));
const Screen3d = dynamic(() => import('@/components/r3f/fountain'));

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip
);

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
      <section className='py-2'>
        <h2 className='text-xl font-bold'>課程許願池</h2>
        <p>
          想學的IT技術在網上找不到好的教程？<br />
          試試許個願吧～<br />
          說不定願望就實現了哦{counter % 2 ? ' / (｀・ω・´) / ' : ' \\ (*´▽｀*) \\ '}
        </p>
      </section>
      <section className='relative py-2 h-[500px] md:h-[700px] overflow-hidden rounded-sm'>
        {/* <Suspense><Screen3d /></Suspense> */}
        <Screen3d />
        <div className='absolute bottom-10 w-full text-center'>
          <Button className='px-10 py-5 rounded-[9999px]' variant='secondary'>
            {user.id ? (
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
          wishes?.data?.length ?
            <div className='md:flex my-5'>
              <Table className='md:me-2 md:w-1/3'>
                <TableCaption>許願池排行榜</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">名次</TableHead>
                    <TableHead>想學的技術</TableHead>
                    <TableHead className="text-right">票數</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wishes.data.slice(0, 7).map((item, idx) => (
                    <TableRow key={item.wish}>
                      <TableCell className="font-medium">{idx + 1}</TableCell>
                      <TableCell>{item.wish}</TableCell>
                      <TableCell className="text-right">{item.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className='md:ms-2 md:w-2/3'>
                <Bar
                  data={{
                    labels: wishes.data.slice(0, 7).map(item => item.wish),
                    datasets: [
                      {
                        data: wishes.data.slice(0, 7).map(item => item.count),
                        backgroundColor: "purple",
                      },
                    ],
                  }}
                />
              </div>
            </div> :
            <div>目前沒有資料。</div>
        }
      </section>

      <Dialog open={openWishModal} onOpenChange={setOpenWishModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>想學甚麼技術呢？</DialogTitle>
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