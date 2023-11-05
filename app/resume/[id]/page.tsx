import { getUserInfo } from '@/api/modules/user';
import Resume from '@/components/resume';
import { type FC } from 'react';

interface Props {
  params: { id: string; };
}
const ResumePage: FC<Props> = async ({ params }) => {
  const { data: user } = await getUserInfo(params.id, true);

  return (
    <>
      <Resume userInfo={user}>

      </Resume>
    </>
  );
};

export default ResumePage;