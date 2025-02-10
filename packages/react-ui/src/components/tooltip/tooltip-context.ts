import { createSafeContext } from "../../primitives";

export type TooltipContextValue = {
  interactive: boolean;
  contentClassName?: string;
};

export const [TooltipContext, useTooltip] = createSafeContext<TooltipContextValue>({
  name: "TooltipContext",
});
