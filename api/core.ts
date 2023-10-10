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
  message: string;
  status: number;
  success: boolean;
}> => {
  if (!url.includes('http')) url = process.env.NEXT_PUBLIC_API_BASE_URL + url;

  if (opt.body) opt.body = JSON.stringify(opt.body);

  if (opt.query) {
    url += (url.includes('?') ? '&' : '?') + Object.keys(opt.query).map(key => `${key}=${opt.query![key]}`).join('&');
  }

  if (!opt.headers) opt.headers = {};
  if (!opt.headers['content-type']) opt.headers['content-type'] = 'application/json';

  if (opt.credentials === undefined) opt.credentials = 'include';

  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    opt.headers.Cookie = cookies().toString();
  }

  return fetch(url, opt as RequestInit).then(res => res.json());
};