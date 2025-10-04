import type { RefObject } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ComboboxInputContextValue = {
  name: string | undefined;
  inputRef: RefObject<HTMLElement | null>;
  inputValue: string;
};

const desc = createSafeContext<ComboboxInputContextValue>({
  name: "ComboboxInputContext",
});
export const ComboboxInputContext: SafeContext<ComboboxInputContextValue> = desc[0];
export const useComboboxInput: UseSafeContext<ComboboxInputContextValue> = desc[1];
