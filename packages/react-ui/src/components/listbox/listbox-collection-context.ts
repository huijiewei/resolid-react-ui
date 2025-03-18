import { createSafeContext } from "../../primitives";
import type { ListboxFieldNames, ListboxNodeItem } from "./utils";

export type ListboxCollectionContextValue<F extends ListboxFieldNames> = {
  collection: ListboxNodeItem<F>[];
};

export const [ListboxCollectionContext, useListboxCollection] = createSafeContext<
  ListboxCollectionContextValue<ListboxFieldNames>
>({
  name: "ListboxCollectionContext",
});
