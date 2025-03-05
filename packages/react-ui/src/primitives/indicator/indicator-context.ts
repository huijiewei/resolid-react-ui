import type { RefObject } from "react";
import { createSafeContext } from "../context";

export type IndicatorContextValue = {
  listRef: RefObject<HTMLElement | null>;
  activeIndex: number | undefined;
};

export const [IndicatorContext, useIndicator] = createSafeContext<IndicatorContextValue>({
  name: "IndicatorContext",
});
