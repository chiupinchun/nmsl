import { request } from "../core";
import { UserInfo } from "./user";

export interface Memo {
  id: number;
  user: UserInfo;
  title: string;
  content: string;
  type: 'todo' | 'doing' | 'done';
  createTime: string;
}
export const getMemos = () => {
  return request<Memo[]>('/memo');
};

interface AddMemoPayload {
  title: string;
  content: string;
  type: Memo['type'];
}
export const addMemo = (payload: AddMemoPayload) => {
  return request('/memo', {
    method: 'POST',
    body: payload
  });
};

interface EditMemoPayload extends AddMemoPayload {
  id: number;
}
export const editMemo = (payload: EditMemoPayload) => {
  const { id, ...body } = payload;

  return request(`/memo/${id}`, {
    method: 'PATCH',
    body: body
  });
};

export const delMemo = (id: number) => {
  return request(`/memo/${id}`, {
    method: 'DELETE'
  });
};