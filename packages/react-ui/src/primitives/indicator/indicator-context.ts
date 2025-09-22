import type { RefObject } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type IndicatorContextValue = {
  listRef: RefObject<HTMLElement | null>;
  activeIndex: number | undefined;
};

const dest = createSafeContext<IndicatorContextValue>({
  name: "IndicatorContext",
});

export const IndicatorContext: SafeContext<IndicatorContextValue> = dest[0];
export const useIndicator: UseSafeContext<IndicatorContextValue> = dest[1];
