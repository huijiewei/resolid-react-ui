import type { Dispatch, HTMLProps, RefObject, SetStateAction } from "react";
import { type AnyObject, createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ListboxFilterContextValue = {
  filterRef: RefObject<boolean>;
  setFilterKeyword: Dispatch<SetStateAction<string | undefined>>;
  getNavigationProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
};

const desc = createSafeContext<ListboxFilterContextValue>({
  name: "ListboxFilterContext",
});

export const ListboxFilterContext: SafeContext<ListboxFilterContextValue> = desc[0];
export const useListboxFilter: UseSafeContext<ListboxFilterContextValue> = desc[1];
