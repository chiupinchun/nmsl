import { request } from "../core";

export const postWish = (wish: string) => {
  return request('/wish', {
    method: 'POST',
    body: { wish }
  });
};

export interface Wish {
  wish: string;
  count: number;
}
export const getWishes = () => {
  return request<Wish[]>('/wish');
};