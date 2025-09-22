import { useEffect, useRef } from "react";
import { useEffectEvent } from "../use-effect-event";
import { useLatestRef } from "../use-lastest-ref";

export const useTimeout = (
  callback: () => void,
  delay: number | null,
): {
  clear: () => void;
  reset: () => void;
} => {
  const ref = useLatestRef(callback);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const clear = (): void => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const reset = (): void => {
    clear();

    if (delay !== null) {
      timer.current = setTimeout(() => ref.current(), delay);
    }
  };

  const resetRef = useEffectEvent(reset);

  useEffect(() => {
    resetRef();

    return clear;
  }, []);

  return { clear, reset };
};
