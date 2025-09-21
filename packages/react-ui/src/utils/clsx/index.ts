import { cn, tv as tvLite, type VariantProps } from "tailwind-variants/lite";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VP<T extends (...args: any) => any> = VariantProps<T>;

export const tx = cn;

export const tv = tvLite;
