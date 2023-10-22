import { type DependencyList, useEffect, useState } from "react";

export default <T = unknown>(
  fetch: (ctx: {
    times: number;
  }) => Promise<T>,
  deps: DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [pending, setPending] = useState(true);
  const [times, setTimes] = useState(0);

  const refresh = () => setTimes(times + 1);

  useEffect(() => {
    setPending(true);
    fetch({ times }).then(res => {
      setData(res);
      setPending(false);
    });
  }, deps.concat(times));

  return {
    data, pending, refresh
  };
};