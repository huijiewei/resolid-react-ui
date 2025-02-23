import type { FloatingRootContext } from "@floating-ui/react";
import type { RefObject } from "react";
import { createSafeContext } from "../../primitives";

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

export type PopoverRootContextValue = PopoverBaseProps & {
  context: FloatingRootContext;
};

export const [PopoverRootContext, usePopoverRoot] = createSafeContext<PopoverRootContextValue>({
  name: "PopoverRootContext",
});
