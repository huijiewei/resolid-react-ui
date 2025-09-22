import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type CollapsibleContentContextValue = {
  id: string;
  open: boolean;
  duration: number;
};

const desc = createSafeContext<CollapsibleContentContextValue>({
  name: "CollapsibleContentContext",
});

export const CollapsibleContentContext: SafeContext<CollapsibleContentContextValue> = desc[0];
export const useCollapsibleContent: UseSafeContext<CollapsibleContentContextValue> = desc[1];
