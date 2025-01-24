import type { ElementType } from "react";
import { PopperArrow } from "../popper/popper-arrow";
import { PopperTrigger, type PopperTriggerProps } from "../popper/popper-trigger";
import { TooltipRoot, type TooltipRootProps } from "./tooltip-root";

export { TooltipContent } from "./tooltip-content";

export const TooltipTrigger = <T extends ElementType = "button">(props: Omit<PopperTriggerProps<T>, "active">) => (
  <PopperTrigger active={false} {...props} />
);

export const TooltipArrow = PopperArrow;

export type TooltipProps = TooltipRootProps;

export const Tooltip = TooltipRoot;
