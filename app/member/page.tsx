"use client";
import { updateUserInfo } from '@/api/modules/user';
import Resume from '@/components/resume';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useSelector } from '@/store';
import { useState, type FC } from 'react';

interface Props { }
const page: FC<Props> = ({ }) => {
  const user = useSelector(state => state.user);

  const { toast } = useToast();

  const [editMode, setEditMode] = useState(false);

  const save = async () => {
    if (editMode) {
      const res = await updateUserInfo(user);
      if (res.success) toast({ description: '更新成功' });
    }
    setEditMode(!editMode);
  };

  return (
    <>
      <Resume userInfo={user} editMode={editMode}>
        <Button onClick={save} className='w-full'>{editMode ? '儲存' : '編輯'}</Button>
      </Resume>
    </>
  );
};

export default page;