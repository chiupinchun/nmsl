import { useEffect, useState } from "react";

interface SetCookieOpt {
  domain?: string;
  maxAge?: number;
  expires?: string;
}
export default (name: string): [
  string | null,
  (value: string | null, options?: SetCookieOpt) => void
] => {
  const [cookieState, setCookieState] = useState<string | null>(null);
  useEffect(() => {
    setCookieState(document.cookie.split(`${name}=`)[1]?.split('; ')?.[0] ?? null);
  }, []);

  const setCookie = (value: string | null, options: SetCookieOpt = {}) => {
    if (!value) document.cookie = `${name}=;max-age=0`;
    else {
      document.cookie = `${name}=${value};` + Object.keys(options).map(key => `${key}=${options[key as keyof SetCookieOpt]}`).join(';');
    }

    if (value !== cookieState) setCookieState(value);
  };

  return [
    cookieState,
    setCookie
  ];
};