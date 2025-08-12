import { clsx } from "clsx";
import { createTV, type VariantProps } from "tailwind-variants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VP<T extends (...args: any) => any> = VariantProps<T>;

export const tx = clsx;

export const tv = createTV({
  twMerge: false,
});
