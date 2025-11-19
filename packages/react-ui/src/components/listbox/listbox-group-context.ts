import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";
import type { ListboxBaseProps, ListboxItem } from "./use-listbox";

export type ListboxGroupContextValue = Required<
  Pick<ListboxBaseProps<ListboxItem>, "renderGroupLabel">
>;

const dest = createSafeContext<ListboxGroupContextValue>({
  name: "ListboxGroupContext",
});

export const ListboxGroupContext: SafeContext<ListboxGroupContextValue> = dest[0];
export const useListboxGroup: UseSafeContext<ListboxGroupContextValue> = dest[1];
