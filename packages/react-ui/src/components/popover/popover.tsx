import type { ElementType } from "react";
import { PopperArrow, type PopperArrowProps } from "../popper/popper-arrow";
import { PopperClose } from "../popper/popper-close";
import { PopperDescrition } from "../popper/popper-description";
import { PopperTitle } from "../popper/popper-title";
import { PopperTrigger, type PopperTriggerProps } from "../popper/popper-trigger";
import { PopoverRoot, type PopoverRootProps } from "./popover-root";

export type PopoverProps = PopoverRootProps;

export const Popover = PopoverRoot;

export const PopoverTrigger = <T extends ElementType = "button">(props: Omit<PopperTriggerProps<T>, "active">) => {
  return <PopperTrigger active={true} {...props} />;
};

export { PopoverContent } from "./popover-content";

export const PopoverArrow = (props: PopperArrowProps) => {
  const { width = 11, height = 6, ...rest } = props;

  return <PopperArrow width={width} height={height} {...rest} />;
};

export const PopoverTitle = PopperTitle;
export const PopoverDescription = PopperDescrition;

export const PopoverClose = PopperClose;
