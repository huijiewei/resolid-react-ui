import type { VirtualItem } from "@tanstack/react-virtual";
import { createSafeContext } from "../../primitives";
import type { ListboxFlatItem } from "./use-listbox";

export type ListboxVirtualizerContextValue = {
  virtualItems: VirtualItem[];
  flatItems: ListboxFlatItem[];
};

export const [ListboxVirtualizerContext, useListboxVirtualizer] = createSafeContext<ListboxVirtualizerContextValue>({
  name: "ListboxVirtualizerContext",
});
