import { type DependencyList, useEffect, useState } from "react";

export default <T = unknown>(
  fetch: () => Promise<T>,
  deps: DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [pending, setPending] = useState(true);
  const [flag, setFlag] = useState(true);

  const refresh = () => setFlag(!flag);

  useEffect(() => {
    setPending(true);
    fetch().then(res => {
      setData(res);
      setPending(false);
    });
  }, deps.concat(flag));

  return {
    data, pending, refresh
  };
};