import { request } from "../core";

export interface LoginPayload {
  account: string;
  password: string;
}
export const login = (payload: LoginPayload) => {
  return request('/user/login', {
    method: 'POST',
    body: payload
  });
};

export interface SignupPayload extends LoginPayload {
  name: string;
}
export const signup = (payload: SignupPayload) => {
  return request<{
    account: string;
    createTime: string;
    id: string;
    name: string;
  }>('/user', {
    method: 'POST',
    body: payload
  });
};

export interface UserInfo {
  id: string;
  name: string;
  avatar: string;

  sex: string;
  contract: string;
  adress: string;
  position: string;
  field: string;
  techs: string;
  description: string;
  checkable: boolean;
  createTime: string;
}
export const getUserInfo = (id?: string, cache?: boolean) => {
  return request<UserInfo>(id ? `/user/${id}` : '/user', { cache: cache ? 'force-cache' : 'no-store' });
};

export const getUsers = (
  query: {
    page?: string;
    tech?: string;
    show?: string;
  } = {}
) => {
  return request<UserInfo[]>('/user/all', { query });
};

export const updateUserInfo = (payload: Partial<UserInfo>) => {
  return request('/user', {
    method: 'PATCH',
    body: payload
  });
};