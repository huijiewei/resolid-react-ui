import { isFunction } from "@resolid/utils";
import type { Ref, RefCallback } from "react";
import { useCallback } from "react";

type OptionalRef<T> = Ref<T> | undefined;
type Cleanup = (() => void) | undefined | void;

const assignRef = <T>(ref: OptionalRef<T>, value: T): Cleanup => {
  if (isFunction(ref)) {
    const cleanup = ref(value);

    if (isFunction(cleanup)) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(mergeRefs(...refs), refs) as RefCallback<T>;
};
