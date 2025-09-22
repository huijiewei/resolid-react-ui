import type { FloatingRootContext } from "@floating-ui/react";
import type { RefObject } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

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

const dest = createSafeContext<PopoverRootContextValue>({
  name: "PopoverRootContext",
});

export const PopoverRootContext: SafeContext<PopoverRootContextValue> = dest[0];
export const usePopoverRoot: UseSafeContext<PopoverRootContextValue> = dest[1];
