import { type SetStateAction, useState } from "react";

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

  const setValue = (value: SetStateAction<T>) => {
    const nextValue = typeof value === "function" ? (value as (prevState?: T) => T)(currentValue) : value;

    if (!shouldUpdate(currentValue, nextValue)) {
      return;
    }

    if (!controlled) {
      setUncontrolledState(nextValue);
    }

    onChange?.(nextValue);
  };

  return [currentValue, setValue] as const;
};
