import type { ComponentProps } from "react";
import { PopperArrow, type PopperArrowProps } from "../../primitives/popper/popper-arrow";
import { PopperClose } from "../../primitives/popper/popper-close";
import { PopperDescription } from "../../primitives/popper/popper-description";
import { PopperTitle } from "../../primitives/popper/popper-title";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { PopoverRoot, type PopoverRootProps } from "./popover-root";

export type PopoverProps = PopoverRootProps;

export const Popover = PopoverRoot;

export const PopoverTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">) => {
  return <PopperTrigger active={true} {...props} />;
};

export { PopoverContent } from "./popover-content";

export const PopoverArrow = (props: PopperArrowProps) => {
  const { width = 11, height = 6, ...rest } = props;

  return <PopperArrow width={width} height={height} {...rest} />;
};

export const PopoverTitle = PopperTitle;
export const PopoverDescription = PopperDescription;

export const PopoverClose = PopperClose;
