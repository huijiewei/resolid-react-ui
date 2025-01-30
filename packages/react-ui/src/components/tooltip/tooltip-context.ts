import { createSafeContext } from "../../primitives";
import type { PopperFloatingContextValue } from "../popper/popper-floating-context";

export type TooltipFloatingContextValue = PopperFloatingContextValue & {
  duration: number;
  interactive: boolean;
  floatingClassName?: string;
};

export const [TooltipFloatingContext, useTooltipFloating] = createSafeContext<TooltipFloatingContextValue>({
  strict: true,
  name: "TooltipFloatingContext",
});
