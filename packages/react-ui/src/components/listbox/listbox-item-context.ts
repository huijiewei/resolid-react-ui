import type { HTMLProps, RefObject } from "react";
import type { AnyObject } from "../../primitives";
import { createSafeContext } from "../../primitives";
import type { ListboxFieldNames, ListboxFlatItem, ListboxRenderItem } from "./utils";

export type ListboxItemContextValue<F extends ListboxFieldNames> = {
  activeIndex: number | null;
  handleSelect: (item: ListboxFlatItem<F>, index: number) => void;
  selectedIndices: number[];
  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
  renderItem: ListboxRenderItem<F>;
  elementsRef: RefObject<(HTMLDivElement | null)[]>;
  typingRef: RefObject<boolean>;
  filterRef: RefObject<boolean>;
};

export const [ListboxItemContext, useListboxItem] = createSafeContext<ListboxItemContextValue<ListboxFieldNames>>({
  name: "ListboxItemContext",
});
