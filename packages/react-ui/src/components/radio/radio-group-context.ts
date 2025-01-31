import type { ChangeEvent } from "react";
import { createSafeContext } from "../../primitives";
import type { BinarySize, ToggleColor } from "../../shared/styles";

export type RadioBaseProps = {
  /**
   * 颜色
   * @default 'primary'
   */
  color?: ToggleColor;

  /**
   * 大小
   * @default 'md'
   */
  size?: BinarySize;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
};

export type RadioGroupBaseProps = RadioBaseProps & {
  /**
   * 单选中输入字段的名称
   */
  name?: string;

  /**
   * 值
   */
  value?: string | number;
};

export type RadioGroupContextValue = RadioGroupBaseProps & {
  onChange: (event: ChangeEvent<HTMLInputElement> | string | number) => void;
  onReset: () => void;
};

export const [RadioGroupContext, useRadioGroup] = createSafeContext<RadioGroupContextValue, boolean>({
  strict: false,
  name: "RadioGroupContext",
});
