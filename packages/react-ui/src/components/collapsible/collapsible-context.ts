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

export type CollapsibleContentContextValue = {
  id: string;
  mounted: boolean;
  status: "unmounted" | "initial" | "open" | "close";
  duration: number;
  setElement: (node: HTMLElement) => void;
};

export const [CollapsibleContentContext, useCollapsibleContent] = createSafeContext<CollapsibleContentContextValue>({
  name: "CollapsibleContentContext",
});
