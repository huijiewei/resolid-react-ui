import { createSafeContext } from "../../primitives";
import type { InputSize } from "../input/input.styles";

export type ListboxStateContextValue = {
  size: InputSize;
  multiple: boolean;
  disabled: boolean;
  readOnly: boolean;
};

export const [ListboxStateContext, useListboxState] = createSafeContext<ListboxStateContextValue>({
  name: "ListboxStateContext",
});
