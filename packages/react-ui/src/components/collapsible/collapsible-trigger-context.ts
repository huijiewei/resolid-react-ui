import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type CollapsibleTriggerContextValue = {
  id: string;
  disabled: boolean;
  open: boolean;
  toggle: () => void;
};

const desc = createSafeContext<CollapsibleTriggerContextValue>({
  name: "CollapsibleTriggerContext",
});

export const CollapsibleTriggerContext: SafeContext<CollapsibleTriggerContextValue> = desc[0];
export const useCollapsibleTrigger: UseSafeContext<CollapsibleTriggerContextValue> = desc[1];
