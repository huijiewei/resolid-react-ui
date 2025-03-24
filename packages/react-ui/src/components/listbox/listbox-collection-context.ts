import { createSafeContext } from "../../primitives";
import type { ListboxNodeItem } from "./use-listbox";

export type ListboxCollectionContextValue = {
  nodeItems: ListboxNodeItem[];
};

export const [ListboxCollectionContext, useListboxCollection] = createSafeContext<ListboxCollectionContextValue>({
  name: "ListboxCollectionContext",
});
