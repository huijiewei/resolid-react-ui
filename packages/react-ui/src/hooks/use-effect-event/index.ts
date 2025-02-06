import { useCallback, useInsertionEffect, useRef } from "react";

export const useEffectEvent = <Args extends unknown[], Return>(fn: ((...args: Args) => Return) | undefined) => {
  const ref = useRef<typeof fn>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args: Args) => ref.current?.(...args), []);
};
