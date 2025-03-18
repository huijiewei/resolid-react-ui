import { createSafeContext } from "../../primitives";
import type { InputSize } from "../input/input.styles";

export type ListboxStateContextValue = {
  disabled: boolean;
  multiple: boolean;
  size: InputSize;
};

export const [ListboxStateContext, useListboxState] = createSafeContext<ListboxStateContextValue>({
  name: "ListboxStateContext",
});
