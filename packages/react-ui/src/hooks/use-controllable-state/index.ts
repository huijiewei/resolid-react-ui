import { type Dispatch, type SetStateAction, useState } from "react";
import { useCallbackRef } from "../use-callback-ref";

export type UseControllableStateOptions<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  shouldUpdate?: (prev: T, next: T) => boolean;
};

export const useControllableState = <T>(options: UseControllableStateOptions<T>) => {
  const { value, defaultValue, onChange, shouldUpdate = (prev, next) => prev !== next } = options;

  const onChangeRef = useCallbackRef(onChange);
  const shouldUpdateRef = useCallbackRef(shouldUpdate);

  const [uncontrolledState, setUncontrolledState] = useState(defaultValue as T);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : uncontrolledState;

  const setValue = useCallbackRef(
    (next: SetStateAction<T>) => {
      const nextValue = typeof next === "function" ? (next as (prevState?: T) => T)(currentValue) : next;

      if (!shouldUpdateRef(currentValue, nextValue)) {
        return;
      }

      if (!controlled) {
        setUncontrolledState(nextValue);
      }

      onChangeRef(nextValue);
    },
    [controlled, currentValue, onChangeRef, shouldUpdateRef],
  );

  return [currentValue, setValue] as [T, Dispatch<SetStateAction<T>>];
};
