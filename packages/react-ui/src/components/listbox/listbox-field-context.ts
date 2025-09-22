import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";
import type { ListboxItem, UseListboxResult } from "./use-listbox";

export type ListboxFieldsContextValue = Pick<
  UseListboxResult<ListboxItem>,
  "getItemValue" | "getItemLabel" | "getItemDisabled" | "getItemChildren"
> & {
  childrenKey: string;
};

const desc = createSafeContext<ListboxFieldsContextValue>({
  name: "ListboxFieldsContext",
});

export const ListboxFieldsContext: SafeContext<ListboxFieldsContextValue> = desc[0];
export const useListboxFields: UseSafeContext<ListboxFieldsContextValue> = desc[1];
