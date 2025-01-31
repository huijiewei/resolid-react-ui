import { type Booleanish, isObject } from "@resolid/utils";

export const isBrowser = typeof document !== "undefined";

export const dataAttr = (condition: boolean | null | undefined) => (condition ? "" : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | null | undefined) => (condition ? true : undefined);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isInputEvent = (value: any): value is { target: HTMLInputElement } => {
  return value && isObject(value) && isObject(value.target);
};
