import { createSafeContext } from "../../primitives";
import type { ListboxBaseProps, ListboxItem } from "./use-listbox";

export type ListboxGroupContextValue = Required<Pick<ListboxBaseProps<ListboxItem>, "renderGroupLabel">>;

export const [ListboxGroupContext, useListboxGroup] = createSafeContext<ListboxGroupContextValue>({
  name: "ListboxGroupContext",
});
