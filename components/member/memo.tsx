"use client";
import { useState, type FC } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import useFetch from '@/hooks/useFetch';
import { useSelector } from '@/store';
import { Memo, addMemo, delMemo, editMemo, getMemos } from '@/api/modules/memo';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

interface Props { }

const page: FC<Props> = ({ }) => {
  const user = useSelector(state => state.user);
  const { toast } = useToast();

  const { data: memos, refresh } = useFetch(
    () => user.id ? getMemos().then(res => {
      const result: { [key in Memo['type']]: Memo[] } = {
        todo: [],
        doing: [],
        done: []
      };
      if (res?.success && res.data?.length) {
        res.data.forEach(memo => {
          result[memo.type].push(memo);
        });
      }
      return result;
    }) : Promise.resolve(null),
    [user.id]
  );

  const [showAddDialog, setShowAddDialog] = useState(false);
  const showAddDialogWithType: {
    (type: Memo['type']): void;
    (toEditMemo: Memo): void;
  } = (memoOrType: Memo | Memo['type'], type?: Memo['type']) => {
    if (typeof memoOrType === 'string') type = memoOrType;
    else {
      type = memoOrType.type;
      setMemoId(memoOrType.id);
      setTitle(memoOrType.title);
      setContent(memoOrType.content);
    }
    setType(type!);
    setShowAddDialog(true);
  };

  const [memoId, setMemoId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<Memo['type']>('todo');

  const reset = () => {
    setShowAddDialog(false);
    setMemoId(null);
    setTitle('');
    setContent('');
    setType('todo');
  };

  const submit = async () => {
    const action = memoId ?
      editMemo({ title, content, type, id: memoId }) :
      addMemo({ title, content, type });
    const res = await action;
    if (res?.success) {
      refresh();
      toast({ description: (memoId ? '更新' : '新增') + '成功' });
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤' });
    reset();
  };

  const removeMemo = async () => {
    if (!memoId) return;
    const res = await delMemo(memoId);
    if (res?.success) {
      refresh();
      toast({ description: '刪除成功' });
    } else toast({ variant: 'destructive', description: res?.message ?? '發生錯誤' });
    reset();
  };

  return (
    <>
      <Accordion type="multiple">
        {memos && Object.keys(memos).map((type) => (
          <AccordionItem value={type} key={type}>
            <AccordionTrigger>{type[0].toUpperCase() + type.slice(1)}</AccordionTrigger>
            <AccordionContent>
              <ul>
                {memos![type as Memo['type']].map(memo => (
                  <li key={memo.id} className='mb-5'>
                    <Card onClick={() => showAddDialogWithType(memo)} className='cursor-pointer'>
                      <CardHeader className='flex flex-row justify-between items-center'>
                        <CardTitle>{memo.title}</CardTitle>
                        <CardDescription>{new Date(memo.createTime).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {memo.content}
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
              <Button onClick={() => showAddDialogWithType(type as Memo['type'])} className='flex mx-auto w-full md:w-fit'>新增項目<Plus /></Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Dialog open={showAddDialog} onOpenChange={show => show ? setShowAddDialog(show) : reset()}>
        <DialogContent>
          <label className='block flex-grow'>標題
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </label>
          <label className='block flex-grow'>內容
            <Textarea value={content} onChange={e => setContent(e.target.value)} />
          </label>
          <label className='block flex-grow'>分類
            <Select value={type} onValueChange={(type: Memo['type']) => setType(type)}>
              <SelectTrigger className="">
                <SelectValue placeholder="請選擇" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">todo</SelectItem>
                <SelectItem value="doing">doing</SelectItem>
                <SelectItem value="done">done</SelectItem>
              </SelectContent>
            </Select>
          </label>
          <div className='flex justify-between'>
            <Button onClick={submit} className='w-1/3'>新增</Button>
            {memoId && <Button onClick={removeMemo} variant='destructive' className='w-1/3'>刪除</Button>}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default page;