import { request } from "../core";


export type GetLessonsPayload = {
  tag?: string;
  series?: string;
  search?: string;
  page?: string;
  show?: string;
  order?: string;
};
export interface Comment {
  id: number;
  content: string;
  user: {
    id: string;
    name: string;
  };
  createTime: string;
}
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
  comments: Comment[];
}
export const getLessons = (
  payload: GetLessonsPayload = {}
) => {

  return request<Lesson[]>('/lesson', {
    query: payload
  });
};

export const getPickupLesson = () => getLessons({ show: '5', order: '-weight' });

export const getLessonById = (id: string, cache?: boolean) => {
  return request<Lesson>('/lesson/' + id, { cache: cache ? 'force-cache' : 'no-cache' });
};

export const getComments = (
  payload: {
    page?: string;
    show?: string;
    lessonId: number;
  }
) => {
  const { lessonId, ...others } = payload;
  return request<Comment[]>('/lesson-comment/' + lessonId, { query: others });
};