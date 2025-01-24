import { type DependencyList, useCallback, useInsertionEffect, useRef } from "react";

export const useCallbackRef = <Args extends unknown[], Return>(
  callback: ((...args: Args) => Return) | undefined,
  deps: DependencyList = [],
) => {
  const callbackRef = useRef<typeof callback>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useInsertionEffect(() => {
    callbackRef.current = callback;
  });

  // eslint-disable-next-line react-compiler/react-compiler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((...args: Args) => callbackRef.current?.(...args), deps);
};
