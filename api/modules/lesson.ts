import { request } from "../core";


type GetLessonsPayload = {
  tag?: string;
  search?: string;
  page?: string;
  show?: string;
  order?: string;
};
export interface Lesson {
  id: number;
  series: string;
  title: string;
  author: string;
  src: string;
  content: string;
  tags: string;
  goods: number;
  views: number;
  weight: number;
  createTime: string;
}
export const getLessons = (
  rawPayload: GetLessonsPayload = {}
) => {
  const { tag, ...payload } = rawPayload;
  if (tag) payload.search = (payload.search ? `${payload.search} ` : '') + tag;

  return request<Lesson[]>('/lesson', {
    query: payload
  });
};

export const getPickupLesson = () => getLessons({ show: '5', order: '-weight' });
