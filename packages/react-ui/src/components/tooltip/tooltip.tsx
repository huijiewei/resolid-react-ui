import type { ComponentProps } from "react";
import { PopperArrow } from "../popper/popper-arrow";
import { PopperTrigger } from "../popper/popper-trigger";
import { TooltipRoot, type TooltipRootProps } from "./tooltip-root";

export { TooltipContent } from "./tooltip-content";

export const TooltipTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">) => (
  <PopperTrigger active={false} {...props} />
);

export const TooltipArrow = PopperArrow;

export type TooltipProps = TooltipRootProps;

export const Tooltip = TooltipRoot;
