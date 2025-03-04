import { useCallback, useInsertionEffect, useRef } from "react";

export const useEffectEvent = <A extends unknown[], R>(fn: ((...args: A) => R) | undefined) => {
  const ref = useRef<typeof fn>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args: A) => ref.current?.(...args), []);
};
