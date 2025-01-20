import { createClassed } from "@tw-classed/core";
import { clsx } from "clsx/lite";

const { classed } = createClassed();

export type { VariantProps } from "@tw-classed/core";

export const cx = clsx;
export const tv = classed;
