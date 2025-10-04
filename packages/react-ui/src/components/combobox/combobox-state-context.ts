import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ComboboxStateContextValue = {
  required: boolean;
  invalid: boolean;
};

const desc = createSafeContext<ComboboxStateContextValue>({
  name: "ComboboxStateContext",
});

export const ComboboxStateContext: SafeContext<ComboboxStateContextValue> = desc[0];
export const useComboboxState: UseSafeContext<ComboboxStateContextValue> = desc[1];
