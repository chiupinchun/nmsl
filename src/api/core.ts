import { Ref, ref, watch } from "vue";

export const request = async <T = unknown>(
  url: string,
  opt: Omit<RequestInit, 'body'> & {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    query?: Record<string, string>;
    body?: Record<string, any> | string;
    headers?: Record<string, string>;
  } = {}
): Promise<{
  data: T;
  totalRecord?: number;
  totalPage?: number;
  msg: string;
  status: number;
  success: boolean;
}> => {
  if (!url.includes('http')) url = import.meta.env.VITE_API_BASE_URL + url;

  if (opt.query) {
    url += (url.includes('?') ? '&' : '?') + Object.keys(opt.query).map(key => `${key}=${opt.query![key]}`).join('&');
  }

  if (opt.body) opt.body = JSON.stringify(opt.body);

  if (!opt.headers) opt.headers = {};
  if (!opt.headers['content-type']) opt.headers['content-type'] = 'application/json';

  if (opt.credentials === undefined) opt.credentials = 'include';

  return fetch(url, opt as RequestInit).then(res => res.json());
};

export const useFetch = <T = unknown>(
  fetch: () => Promise<T>,
  opt: {
    watch?: any[];
    transform?: (res: unknown) => T;
  } = {}
) => {
  const data: Ref<T | null> = ref(null);
  const pendding = ref(true);

  const refresh = () => {
    pendding.value = true;
    fetch().then(res => {
      const value = opt.transform ? opt.transform(res) : res;
      data.value = value;
      pendding.value = false;
    });
  };
  refresh();

  if (opt.watch) watch(opt.watch, refresh);

  return { data, pendding, refresh };
};