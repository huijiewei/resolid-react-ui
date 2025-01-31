import { createSafeContext } from "../../primitives";
import type { ButtonStyleProps } from "./button.styles";

export type ButtonBaseProps = {
  /**
   * 外观
   * @default "solid"
   */
  variant?: ButtonStyleProps["variant"];

  /**
   * 颜色
   * @default "primary"
   */
  color?: ButtonStyleProps["color"];

  /**
   * 大小
   * @default "md"
   */
  size?: ButtonStyleProps["size"];

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export type ButtonGroupContextValue = ButtonBaseProps & {
  /**
   * 布局方向
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
};

export const [ButtonGroupContext, useButtonGroup] = createSafeContext<ButtonGroupContextValue, false>({
  strict: false,
  name: "ButtonGroupContext",
});
