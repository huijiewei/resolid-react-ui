import type { HTMLProps, RefObject } from "react";
import type { AnyObject } from "../../primitives";
import { createSafeContext } from "../../primitives";
import type { ListboxBaseProps, ListboxItem, UseListboxResult } from "./use-listbox";

export type ListboxItemContextValue = {
  activeIndex: number | null;
  selectedIndices: number[];
  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
  elementsRef: RefObject<(HTMLDivElement | null)[]>;
  typingRef: RefObject<boolean>;
  filterRef: RefObject<boolean>;
} & Required<Pick<ListboxBaseProps<ListboxItem>, "renderItem">> &
  Required<Pick<UseListboxResult<ListboxItem>, "handleSelect">>;

export const [ListboxItemContext, useListboxItem] = createSafeContext<ListboxItemContextValue>({
  name: "ListboxItemContext",
});
