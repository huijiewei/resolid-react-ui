import { createSafeContext } from "../../primitives";
import type { ListboxFieldNames } from "./utils";

export type ListboxFieldsContextValue<F extends ListboxFieldNames> = {
  fieldNames: Required<F>;
};

export const [ListboxFieldsContext, useListboxFields] = createSafeContext<ListboxFieldsContextValue<ListboxFieldNames>>(
  {
    name: "ListboxFieldsContext",
  },
);
