import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter as useRouter_next, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

let _push: (href: string, options?: NavigateOptions | undefined) => void;

type Url = NavigateOptions & {
  to?: string;
  query?: Record<string, string>;
};
export const useRouter = () => {
  const router = useRouter_next();
  if (!_push) _push = router.push;
  const path = usePathname();
  const _query = useSearchParams();

  const push: {
    (href: string, options?: NavigateOptions | undefined): void;
    (url: Url): void;
  } = useCallback((url: string | Url, options?: NavigateOptions) => {
    if (typeof url === 'string') return _push(url, options);

    const { to = path, query: toQuery, ...otherOptions } = url;
    const parsedQuery = (toQuery ? new URLSearchParams(toQuery) : _query).toString();

    return _push(to + '?' + parsedQuery, otherOptions);
  }, [router, path, _query]);

  const query: Record<string, string> = useMemo(() => _query.toString().split('&').reduce((res, item) => {
    if (item) {
      const arr = item.split('=');
      res[arr[0]] = arr.slice(1).join('=');
    }
    return res;
  }, {} as Record<string, string>), [_query]);

  return Object.assign(router, { path, push, query });
};