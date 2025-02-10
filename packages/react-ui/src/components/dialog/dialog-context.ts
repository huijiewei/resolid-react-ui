import type { FloatingRootContext } from "@floating-ui/react";
import type { RefObject } from "react";
import { createSafeContext } from "../../primitives";

export type DialogBaseProps = {
  /**
   * 开启后焦点目标
   */
  initialFocus?: number | RefObject<HTMLElement>;

  /**
   * 关闭后焦点目标
   */
  finalFocus?: RefObject<HTMLElement>;

  /**
   * 滚动行为
   * @default "inside"
   */
  scrollBehavior?: "inside" | "outside";

  /**
   * 放置位置
   * @default "top"
   */
  placement?: "top" | "center" | "bottom";
};

export type DialogContextValue = DialogBaseProps & { context: FloatingRootContext };

export const [DialogContext, useDialog] = createSafeContext<DialogContextValue>({ name: "DialogContext" });
