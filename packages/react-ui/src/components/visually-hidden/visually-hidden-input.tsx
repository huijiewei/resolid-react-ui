import type { JSX } from "react";

export type VisuallyHiddenInputProps<T> = {
  name: string;
  value: T | T[] | null;
  getValue?: (value: T) => string | number;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
};

export const VisuallyHiddenInput = <T,>({
  name,
  value,
  getValue,
  required,
  disabled,
}: VisuallyHiddenInputProps<T>): JSX.Element | JSX.Element[] => {
  if (Array.isArray(value)) {
    if (value.length == 0 && required) {
      return (
        <input
          type="hidden"
          disabled={disabled}
          required={required}
          className="sr-only"
          name={name}
          value=""
        />
      );
    }

    return value.map((v) => {
      const sv = getValue ? getValue(v) : (v as string);

      return (
        <input
          type="hidden"
          className="sr-only"
          disabled={disabled}
          required={required}
          name={`${name}[]`}
          key={sv}
          value={sv}
        />
      );
    });
  }

  return (
    <input
      type="hidden"
      className="sr-only"
      disabled={disabled}
      required={required}
      name={name}
      value={value ? (getValue ? getValue(value) : (value as string)) : ""}
    />
  );
};
