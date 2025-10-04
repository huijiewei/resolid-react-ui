import type { ComponentProps, PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";
import { PopperArrow } from "../../primitives/popper/popper-arrow";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { TooltipProvider } from "./tooltip-provider";
import { type TooltipProps, useTooltip } from "./use-tooltip";

export type { TooltipProps };

export const Tooltip = (props: PropsWithChildren<TooltipProps>): JSX.Element => {
  const { children, ...rest } = props;

  const tooltip = useTooltip(rest);

  return <TooltipProvider value={tooltip}>{children}</TooltipProvider>;
};

export const TooltipTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">): JSX.Element => (
  <PopperTrigger active={false} {...props} />
);

export const TooltipArrow: typeof PopperArrow = PopperArrow;

export { TooltipContent } from "./tooltip-content";
