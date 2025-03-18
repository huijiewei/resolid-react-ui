import type { Dispatch, HTMLProps, RefObject, SetStateAction } from "react";
import { type AnyObject, createSafeContext } from "../../primitives";

export type ListboxFilterContextValue = {
  filterRef: RefObject<boolean>;
  setFilterKeyword: Dispatch<SetStateAction<string | undefined>>;
  getNavigationProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
};

export const [ListboxFilterContext, useListboxFilter] = createSafeContext<ListboxFilterContextValue>({
  name: "ListboxFilterContext",
});
