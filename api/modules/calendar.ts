import { request } from "../core";
import { UserInfo } from "./user";

export interface Calendar {
  id: number;
  user: UserInfo;
  title: string;
  content: string;
  date: string;
  createTime: string;
}
export const getCalendars = () => {
  return request<Calendar[]>('/calendar');
};

export interface AddCalendarPayload {
  title: string;
  content: string;
  date: Date;
}
export const addCalendar = (payload: AddCalendarPayload) => {
  return request('/calendar', {
    method: 'POST',
    body: payload
  });
};

export interface EditCalendarPayload extends AddCalendarPayload {
  id: number;
}
export const editCalendar = (payload: EditCalendarPayload) => {
  const { id, ...body } = payload;

  return request(`/calendar/${id}`, {
    method: 'PATCH',
    body: body
  });
};

export const delCalendar = (id: number) => {
  return request(`/calendar/${id}`, {
    method: 'DELETE'
  });
};