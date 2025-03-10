import { createSafeContext } from "../../primitives";

export type CollapsibleContentContextValue = {
  id: string;
  open: boolean;
  duration: number;
};

export const [CollapsibleContentContext, useCollapsibleContent] = createSafeContext<CollapsibleContentContextValue>({
  name: "CollapsibleContentContext",
});
