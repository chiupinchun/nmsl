"use client";
import { useState, type FC, useRef, ChangeEventHandler, KeyboardEventHandler } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from 'next/image';
import defaultAvatar from '@/assets/images/defaultAvatar.webp';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Facebook, Link, Twitter, Upload } from 'lucide-react';
import { UserInfo, updateUserInfo } from '@/api/modules/user';
import { useSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/user';
import { Switch } from './ui/switch';
import Share from './share';

interface ResumeInputItemProps {
  editMode: boolean;
  model: keyof UserInfo;
  isTextarea?: boolean;
}
const ResumeInputItem = ({ editMode, model, isTextarea = false }: ResumeInputItemProps) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const Blank = isTextarea ? Textarea : Input;

  return (
    editMode ? <Blank value={user[model] as string} onChange={e => dispatch(setUserInfo({ [model]: e.target.value }))} className='scroll-bar' /> : <div className='whitespace-pre-line'>{user[model] || '未填'}</div>
  );
};

interface ResumeProps {
  userInfo: UserInfo;
  children?: React.ReactNode;
  editMode?: boolean;
}
const resume: FC<ResumeProps> = ({ userInfo, children, editMode = false }) => {
  const dispatch = useDispatch();

  const avatarInput = useRef<HTMLInputElement>(null!);
  const updateAvatar: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const reader = new FileReader();
    reader.onload = async () => {
      dispatch(setUserInfo({
        avatar: reader.result as string
      }));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const [newTag, setNewTag] = useState('');
  const pushTag: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!newTag.trim()) return;
    if (e.key === 'Enter') {
      dispatch(setUserInfo({
        techs: userInfo.techs ? userInfo.techs + `,${newTag}` : newTag
      }));
      setNewTag('');
    }
  };


  return (
    <>
      <Card>
        <CardHeader className='block md:flex flex-row justify-between items-center'>
          <CardTitle>自我介紹</CardTitle>
          <Share url={`/resume/${userInfo.id}`} />
        </CardHeader>

        <CardContent className='md:flex flex-row-reverse justify-between items-stretch overflow-hidden'>
          <div className='flex flex-col justify-between'>
            <div>
              <figure className='relative'>
                <Image src={userInfo.avatar || defaultAvatar} width={0} height={0} alt='大頭照' priority className='w-80 h-auto' />
                {editMode && (<>
                  <figcaption onClick={() => avatarInput.current.click()} className='absolute top-0 left-0 flex justify-center items-center w-full h-full bg-slate-700 bg-opacity-50 opacity-0 cursor-pointer transition hover:opacity-100'><Upload width={50} height={50} /></figcaption>
                  <input type="file" ref={avatarInput} style={{ display: 'none' }} onChange={updateAvatar} />
                </>)}
              </figure>
              <label className='flex items-center my-5'>
                {editMode ? (<>
                  是否公開履歷
                  <Switch checked={userInfo.checkable} onCheckedChange={(checkable) => dispatch(setUserInfo({ checkable }))} className='ms-2' />
                </>) : (userInfo.checkable ? '' : '不') + '公開履歷'}
              </label>
            </div>
            <div className='hidden md:block'>{children}</div>
          </div>
          <form className='grid grid-cols-6 gap-6 md:mx-2 max-w-4xl w-full'>
            <label className='col-span-6 md:col-span-3'>暱稱
              <ResumeInputItem editMode={editMode} model='name' />
            </label>
            <label className='col-span-6 md:col-span-3'>性別
              {
                editMode ?
                  <Select value={userInfo.sex} onValueChange={sex => dispatch(setUserInfo({ sex }))}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="請選擇" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="不公開">不公開</SelectItem>
                      <SelectItem value="男">男</SelectItem>
                      <SelectItem value="女">女</SelectItem>
                      <SelectItem value="其他">其他</SelectItem>
                    </SelectContent>
                  </Select> :
                  <div>{userInfo.sex}</div>
              }
            </label>
            <label className='col-span-6 md:col-span-3'>聯絡方式
              <ResumeInputItem editMode={editMode} model='contract' />
            </label>
            <label className='col-span-6 md:col-span-3'>居住地區
              <ResumeInputItem editMode={editMode} model='adress' />
            </label>
            <label className='col-span-6 md:col-span-3'>公司／職稱
              <ResumeInputItem editMode={editMode} model='position' />
            </label>
            <label className='col-span-6 md:col-span-3'>專攻領域
              <ResumeInputItem editMode={editMode} model='field' />
            </label>
            <label className='col-span-6 overflow-x-auto'>擅長技術
              <ul className='flex items-center p-1 space-x-3'>
                {userInfo.techs ?
                  userInfo.techs.split(',').map(tag => (
                    <li onClick={() => editMode && dispatch(setUserInfo({ techs: userInfo.techs.replace(tag, '').replace(',,', ',') }))} key={tag}>
                      <Badge className='cursor-pointer'>
                        {tag}
                        {editMode && <span className='ms-1'>x</span>}
                      </Badge>
                    </li>
                  )) :
                  (!editMode && '未填')}
                {editMode && <li><Input value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={pushTag} className='w-24'></Input></li>}
              </ul>
            </label>
            <label className='col-span-6'>簡介
              <ResumeInputItem editMode={editMode} model='description' isTextarea={true} />
            </label>
            <div className='block md:hidden col-span-6'>{children}</div>
          </form>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </>
  );
};

export default resume;