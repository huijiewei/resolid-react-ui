import { useEffect, useRef } from "react";
import { useEffectEvent } from "../use-effect-event";
import { useLatestRef } from "../use-lastest-ref";

export const useTimeout = (callback: () => void, delay: number | null) => {
  const ref = useLatestRef(callback);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  const clear = useEffectEvent(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  });

  const reset = useEffectEvent(() => {
    clear();

    if (delay !== null) {
      timer.current = setTimeout(() => ref.current(), delay);
    }
  });

  useEffect(() => {
    reset();

    return clear;
  }, [clear, reset]);

  return { clear, reset };
};
