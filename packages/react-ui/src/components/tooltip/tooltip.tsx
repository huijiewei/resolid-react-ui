import type { ComponentProps, PropsWithChildren } from "react";
import { PopperArrow } from "../../primitives/popper/popper-arrow";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { TooltipProvider } from "./tooltip-provider";
import { type TooltipProps, useTooltip } from "./use-tooltip";

export const Tooltip = (props: PropsWithChildren<TooltipProps>) => {
  const { children, ...rest } = props;

  const tooltip = useTooltip(rest);

  return <TooltipProvider value={tooltip}>{children}</TooltipProvider>;
};

export const TooltipTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">) => (
  <PopperTrigger active={false} {...props} />
);

export const TooltipArrow = PopperArrow;

export { TooltipContent } from "./tooltip-content";
