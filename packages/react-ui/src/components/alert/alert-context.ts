import { createSafeContext } from "../../primitives";
import type { AlertStyleProps } from "./alert.styles";

export type AlertContextValue = {
  /**
   * 外观
   * @default 'soft'
   */
  variant?: AlertStyleProps["variant"];

  /**
   * 颜色
   * @default 'primary'
   */
  color?: AlertStyleProps["color"];
};

export const [AlertContext, useAlert] = createSafeContext<Required<AlertContextValue>>({
  strict: true,
  name: "AlertContext",
});
