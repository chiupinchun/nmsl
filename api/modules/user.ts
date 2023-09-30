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