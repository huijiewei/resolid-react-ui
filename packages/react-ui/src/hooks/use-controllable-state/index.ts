import { type Dispatch, type SetStateAction, useState } from "react";

export type UseControllableStateOptions<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  shouldUpdate?: (prev: T, next: T) => boolean;
};

export const useControllableState = <T>(options: UseControllableStateOptions<T>) => {
  const { value, defaultValue, onChange, shouldUpdate = (prev, next) => prev !== next } = options;

  const [uncontrolledState, setUncontrolledState] = useState(defaultValue as T);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : uncontrolledState;

  const setValue = (next: SetStateAction<T>) => {
    const nextValue = typeof next === "function" ? (next as (prevState?: T) => T)(currentValue) : next;

    if (!shouldUpdate(currentValue, nextValue)) {
      return;
    }

    if (!controlled) {
      setUncontrolledState(nextValue);
    }

    onChange?.(nextValue);
  };

  return [currentValue, setValue] as [T, Dispatch<SetStateAction<T>>];
};
