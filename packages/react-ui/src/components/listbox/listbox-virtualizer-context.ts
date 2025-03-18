import type { VirtualItem } from "@tanstack/react-virtual";
import { createSafeContext } from "../../primitives";
import type { ListboxFieldNames, ListboxNodeItem } from "./utils";

export type ListboxGroupItem<F extends ListboxFieldNames> = ListboxNodeItem<F> & { __group?: boolean };

export type ListboxVirtualizerContextValue<F extends ListboxFieldNames> = {
  virtualItems: VirtualItem[];
  flatItems: ListboxGroupItem<F>[];
};

export const [ListboxVirtualizerContext, useListboxVirtualizer] = createSafeContext<
  ListboxVirtualizerContextValue<ListboxFieldNames>
>({
  name: "ListboxVirtualizerContext",
});
