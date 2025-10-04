import type { FloatingRootContext } from "@floating-ui/react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ComboboxRootContextValue = {
  rootContext: FloatingRootContext;
};

const desc = createSafeContext<ComboboxRootContextValue>({
  name: "ComboboxRootContext",
});

export const ComboboxRootContext: SafeContext<ComboboxRootContextValue> = desc[0];
export const useComboboxRoot: UseSafeContext<ComboboxRootContextValue> = desc[1];
