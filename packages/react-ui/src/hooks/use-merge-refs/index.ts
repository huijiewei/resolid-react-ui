import type { Ref, RefCallback } from "react";
import { useCallback } from "react";

type OptionalRef<T> = Ref<T> | undefined;
type Cleanup = (() => void) | undefined | void;

export const assignRef = <T>(ref: OptionalRef<T>, value: T): Cleanup => {
  if (typeof ref === "function") {
    const cleanup = ref(value);

    if (typeof cleanup === "function") {
      return cleanup;
    }
    return () => ref(null);
  } else if (ref) {
    ref.current = value;

    return () => (ref.current = null);
  }
};

export const mergeRefs = <T>(...refs: OptionalRef<T>[]) => {
  return (value: T | null) => {
    const cleanups: Cleanup[] = [];

    for (const ref of refs) {
      const cleanup = assignRef(ref, value);

      cleanups.push(cleanup);
    }

    return () => {
      for (const cleanup of cleanups) {
        cleanup?.();
      }
    };
  };
};

export const useMergeRefs = <T>(...refs: OptionalRef<T>[]) => {
  // eslint-disable-next-line react-compiler/react-compiler,react-hooks/exhaustive-deps
  return useCallback(mergeRefs(...refs), refs) as RefCallback<T>;
};
