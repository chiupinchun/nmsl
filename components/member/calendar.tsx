"use client";
import type { FC } from 'react';
import { Calendar } from "@/components/ui/calendar";
import React, { useMemo, useReducer, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { AddCalendarPayload, EditCalendarPayload, addCalendar, delCalendar, editCalendar, getCalendars } from '@/api/modules/calendar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { isSameDay } from 'date-fns';
import { Dialog, DialogContent } from '../ui/dialog';
import { useToast } from '../ui/use-toast';

enum DateReducerType {
  Date,
  Month
}
const dateReducer = (
  state: {
    date: Date | undefined;
    month: Date | undefined;
  },
  action: {
    type: DateReducerType;
    payload: Date | undefined;
  }
) => {
  switch (action.type) {
    case DateReducerType.Date:
      return {
        date: action.payload,
        month: action.payload
      };
    case DateReducerType.Month:
      return {
        ...state,
        month: action.payload
      };
  }
};

enum FormReducerType {
  Close,
  AddMode,
  EditMode,
  Reset
}
interface DateForm {
  id: undefined | null | number;
  title: string;
  content: string;
}
const formReducer = (
  state: DateForm,
  action: {
    type: FormReducerType,
    payload?: Partial<DateForm>;
  }
) => {
  switch (action.type) {
    case FormReducerType.Close:
      return {
        ...state,
        id: undefined
      };
    case FormReducerType.AddMode:
      return {
        id: null,
        title: '',
        content: ''
      };
    case FormReducerType.EditMode:
      return {
        ...state,
        ...action.payload
      };
    case FormReducerType.Reset:
      return {
        ...state,
        title: '',
        content: ''
      };
  }
};

interface Props { }

const Calender: FC<Props> = ({ }) => {
  const { toast } = useToast();

  const { data, refresh } = useFetch(getCalendars);
  const markedDays = useMemo(() => data?.data?.map(item => new Date(item.date)) ?? [], [data]);
  const [dateState, dispatchDate] = useReducer(dateReducer, {
    date: new Date(),
    month: new Date()
  });
  const dateSchedules = useMemo(() => data?.data?.filter(item => dateState.date && isSameDay(item.date, dateState.date)) ?? [], [data, dateState.date]);

  const [formState, dispatchForm] = useReducer(formReducer, {
    id: undefined,
    title: '',
    content: ''
  });

  const submit = async () => {
    const body = { ...formState, date: dateState.date };
    if (!body.date || body.id === undefined) return;

    const { id, ...bodyWithoutId } = body;
    const action = id === null ? addCalendar(bodyWithoutId as AddCalendarPayload) : editCalendar(body as EditCalendarPayload);

    const res = await action;
    if (res?.success) {
      refresh();
      toast({ description: (body.id === null ? '新增' : '更新') + '成功' });
      dispatchForm({ type: FormReducerType.Close });
    } else {
      toast({ variant: 'destructive', description: res?.message ?? '發生錯誤' });
    }
  };

  const remove = async (id: number) => {
    const res = await delCalendar(id);
    if (res?.success) {
      refresh();
      toast({ description: '刪除成功' });
    } else {
      toast({ variant: 'destructive', description: res?.message ?? '發生錯誤' });
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-center md:items-start'>
      <Calendar
        mode="single"
        selected={dateState.date}
        modifiers={{ marked: markedDays }}
        modifiersClassNames={{ marked: 'border-2 rounded border-red-600' }}
        month={dateState.month}
        onSelect={payload => dispatchDate({ type: DateReducerType.Date, payload })}
        onMonthChange={(payload) => dispatchDate({ type: DateReducerType.Month, payload })}
        footer={<div className='flex justify-between mt-2'>
          <Button onClick={() => dispatchDate({ type: DateReducerType.Date, payload: new Date() })}>今天</Button>
          <Button onClick={() => dispatchForm({ type: FormReducerType.AddMode })}>新增</Button>
        </div>}
        className="w-fit rounded-md border"
      />
      <div className='p-3 w-full'>
        <p className='mb-2 text-center'>{dateState.date?.toLocaleDateString()} 的行程</p>
        <ul className='space-y-5'>
          {dateSchedules.map(date => (
            <li key={date.id} className='px-4 py-1'>
              <div className='flex justify-between items-center mb-2'>
                <h5 className='w-auto overflow-hidden'>{date.title}</h5>
                <div className='space-x-2 w-max'>
                  <Button onClick={() => dispatchForm({
                    type: FormReducerType.EditMode,
                    payload: date
                  })} size='sm'>編輯</Button>
                  <Button onClick={() => remove(date.id)} variant='destructive' size='sm'>刪除</Button>
                </div>
              </div>
              <p className='p-3 min-h-[50px] rounded-md bg-slate-500'>{date.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <Dialog open={formState.id !== undefined} onOpenChange={show => dispatchForm({ type: show ? FormReducerType.AddMode : FormReducerType.Close })}>
        <DialogContent>
          <form onSubmit={e => e.preventDefault()} className='p-3 w-full'>
            <p className='mb-2 text-center'>{dateState.date?.toLocaleDateString()} 的行程</p>
            <label className='block flex-grow'>標題
              <Input value={formState.title} onChange={e => dispatchForm({ type: FormReducerType.EditMode, payload: { title: e.target.value } })} />
            </label>
            <label className='block flex-grow'>內容
              <Textarea value={formState.content} onChange={e => dispatchForm({ type: FormReducerType.EditMode, payload: { content: e.target.value } })} />
            </label>
            <div className='flex justify-between'>
              <Button onClick={submit} className='mt-3' size='sm'>確認</Button>
              <Button onClick={() => dispatchForm({ type: FormReducerType.Reset })} className='mt-3' variant='destructive' size='sm'>清除</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );

};

export default Calender;