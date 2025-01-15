import { useCallback, useState } from "react";

export type UseControllableStateProps<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
};

export const useControllableState = <T>({ value, defaultValue, onChange }: UseControllableStateProps<T>) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : uncontrolledValue;

  const setValue = useCallback(
    (value: T) => {
      if (controlled) {
        return onChange?.(value);
      }

      setUncontrolledValue(value);

      return onChange?.(value);
    },
    [controlled, onChange],
  );

  return [currentValue as T, setValue] as const;
};
