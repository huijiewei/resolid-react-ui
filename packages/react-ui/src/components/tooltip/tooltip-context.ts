import { createSafeContext } from "../../primitives";
import type { PopperFloatingContextValue } from "../popper/popper-floating-context";

export type TooltipFloatingContextValue = Omit<PopperFloatingContextValue, "context"> & {
  interactive: boolean;
  floatingClassName?: string;
};

export const [TooltipFloatingContext, useTooltipFloating] = createSafeContext<TooltipFloatingContextValue>({
  name: "TooltipFloatingContext",
});
