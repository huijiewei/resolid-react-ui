import type { RefObject } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ComboboxTriggerContextValue = {
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const desc = createSafeContext<ComboboxTriggerContextValue>({
  name: "ComboboxTriggerContext",
});
export const ComboboxTriggerContext: SafeContext<ComboboxTriggerContextValue> = desc[0];
export const useComboboxTrigger: UseSafeContext<ComboboxTriggerContextValue> = desc[1];
