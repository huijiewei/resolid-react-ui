import type { ComponentProps, PropsWithChildren } from "react";
import { PopperAnchor } from "../../primitives/popper/popper-anchor";
import { PopperArrow, type PopperArrowProps } from "../../primitives/popper/popper-arrow";
import { PopperClose } from "../../primitives/popper/popper-close";
import { PopperDescription } from "../../primitives/popper/popper-description";
import { PopperTitle } from "../../primitives/popper/popper-title";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { PopoverProvider } from "./popover-provider";
import { type PopoverProps, usePopover } from "./use-popover";

export const Popover = (props: PropsWithChildren<PopoverProps>) => {
  const { children, ...rest } = props;

  const popover = usePopover(rest);

  return <PopoverProvider value={popover}>{children}</PopoverProvider>;
};

export const PopoverTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">) => {
  return <PopperTrigger active={true} {...props} />;
};

export const PopoverArrow = (props: PopperArrowProps) => {
  const { width = 11, height = 6, ...rest } = props;

  return <PopperArrow width={width} height={height} {...rest} />;
};

export const PopoverAnchor = PopperAnchor;
export const PopoverTitle = PopperTitle;
export const PopoverDescription = PopperDescription;
export const PopoverClose = PopperClose;

export { PopoverContent } from "./popover-content";
