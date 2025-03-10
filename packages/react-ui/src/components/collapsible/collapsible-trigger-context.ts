import { createSafeContext } from "../../primitives";

export type CollapsibleTriggerContextValue = {
  id: string;
  disabled: boolean;
  open: boolean;
  toggle: () => void;
};

export const [CollapsibleTriggerContext, useCollapsibleTrigger] = createSafeContext<CollapsibleTriggerContextValue>({
  name: "CollapsibleTriggerContext",
});
