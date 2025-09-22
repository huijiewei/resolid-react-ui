import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type TooltipRootContextValue = {
  interactive: boolean;
  contentClassName?: string;
};

const dest = createSafeContext<TooltipRootContextValue>({
  name: "TooltipRootContext",
});

export const TooltipRootContext: SafeContext<TooltipRootContextValue> = dest[0];
export const useTooltipRoot: UseSafeContext<TooltipRootContextValue> = dest[1];
