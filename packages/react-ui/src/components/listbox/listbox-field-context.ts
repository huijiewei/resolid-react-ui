import { createSafeContext } from "../../primitives";
import type { ListboxItem, UseListboxResult } from "./use-listbox";

export type ListboxFieldsContextValue = Pick<
  UseListboxResult<ListboxItem>,
  "getItemValue" | "getItemLabel" | "getItemDisabled" | "getItemChildren"
> & {
  childrenKey: string;
};

export const [ListboxFieldsContext, useListboxFields] = createSafeContext<ListboxFieldsContextValue>({
  name: "ListboxFieldsContext",
});
