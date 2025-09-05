import { isBrowser } from "@resolid/utils";
import { type RefObject, useRef } from "react";
import { useIsomorphicEffect } from "../use-isomorphic-effect";

export const useResizeObserver = <T extends Element>(
  target: RefObject<T | null> | T | null,
  callback: (entry: ResizeObserverEntry) => void,
  options?: ResizeObserverOptions,
) => {
  const observerRef = useRef<ResizeObserver>(null);
  const callbackRef = useRef(callback);

  useIsomorphicEffect(() => {
    if (!isBrowser) {
      return;
    }

    const element = target && "current" in target ? target.current : target;

    if (!element) {
      return;
    }

    observerRef.current = new ResizeObserver((entries) => {
      callbackRef.current(entries[0]);
    });

    observerRef.current.observe(element, options);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [target, options]);
};
