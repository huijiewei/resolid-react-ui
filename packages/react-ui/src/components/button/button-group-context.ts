import { createSafeContext } from "../../primitives";
import type { Orientation } from "../../shared/types";
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
   * 按钮圆角
   * @default true
   */
  radius?: number | boolean | "full";

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
  orientation?: Orientation;
};

export const [ButtonGroupContext, useButtonGroup] = createSafeContext<ButtonGroupContextValue>({
  name: "ButtonGroupContext",
});
