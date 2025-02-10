import type { RefObject } from "react";
import { createSafeContext } from "../../primitives";
import type { PopperFloatingContextValue } from "../popper/popper-floating-context";

export type PopoverBaseProps = {
  /**
   * 开启后焦点目标
   */
  initialFocus?: number | RefObject<HTMLElement>;

  /**
   * 关闭后焦点目标
   */
  finalFocus?: RefObject<HTMLElement>;
};

export type PopoverContextValue = PopoverBaseProps & PopperFloatingContextValue;

export const [PopoverContext, usePopover] = createSafeContext<PopoverContextValue>({ name: "PopoverContext" });
