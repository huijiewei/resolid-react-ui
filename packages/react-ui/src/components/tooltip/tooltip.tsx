import type { ComponentProps } from "react";
import { PopperArrow } from "../../primitives/popper/popper-arrow";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { TooltipRoot, type TooltipRootProps } from "./tooltip-root";

export { TooltipContent } from "./tooltip-content";

export const TooltipTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">) => (
  <PopperTrigger active={false} {...props} />
);

export const TooltipArrow = PopperArrow;

export type TooltipProps = TooltipRootProps;

export const Tooltip = TooltipRoot;
