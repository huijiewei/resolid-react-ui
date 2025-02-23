import { createSafeContext } from "../../primitives";

export type TooltipRootContextValue = {
  interactive: boolean;
  contentClassName?: string;
};

export const [TooltipRootContext, useTooltipRoot] = createSafeContext<TooltipRootContextValue>({
  name: "TooltipRootContext",
});
