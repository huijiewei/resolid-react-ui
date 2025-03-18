import type { ScrollToOptions } from "@tanstack/react-virtual";
import type { RefObject } from "react";
import { createSafeContext } from "../../primitives";

export type VirtualScrollTo = (index: number, options?: ScrollToOptions) => void;

export type ListboxScrollContextValue = {
  scrollToRef: RefObject<VirtualScrollTo | null>;
};

export const [ListboxScrollContext, useListboxScroll] = createSafeContext<ListboxScrollContextValue>({
  name: "ListboxScrollContext",
});
