import { cva, cx, type VariantProps } from "cva";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VP<T extends (...args: any) => any> = VariantProps<T>;

export const tx = cx;

export const tv = cva;
