import { createSafeContext } from "../../primitives";
import type { ListboxFieldNames, ListboxRenderGroupLabel } from "./utils";

export type ListboxGroupContextValue<F extends ListboxFieldNames> = {
  renderGroupLabel: ListboxRenderGroupLabel<F>;
};

export const [ListboxGroupContext, useListboxGroup] = createSafeContext<ListboxGroupContextValue<ListboxFieldNames>>({
  name: "ListboxGroupContext",
});
