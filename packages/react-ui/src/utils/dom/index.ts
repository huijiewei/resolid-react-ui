import type { Booleanish } from "@resolid/utils";

export const isBrowser = typeof document !== "undefined";

export const dataAttr = (condition: boolean | null | undefined) => (condition ? "" : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | null | undefined) => (condition ? true : undefined);
