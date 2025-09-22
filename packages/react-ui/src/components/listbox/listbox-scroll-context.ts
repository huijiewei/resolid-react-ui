import type { ScrollToOptions } from "@tanstack/react-virtual";
import type { RefObject } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type VirtualScrollTo = (index: number, options?: ScrollToOptions) => void;

export type ListboxScrollContextValue = {
  scrollRef: RefObject<HTMLElement | null>;
  scrollToRef: RefObject<VirtualScrollTo | null>;
};

const dest = createSafeContext<ListboxScrollContextValue>({
  name: "ListboxScrollContext",
});

export const ListboxScrollContext: SafeContext<ListboxScrollContextValue> = dest[0];
export const useListboxScroll: UseSafeContext<ListboxScrollContextValue> = dest[1];
