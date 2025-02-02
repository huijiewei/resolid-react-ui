import type { ChangeEvent } from "react";
import { createSafeContext } from "../../primitives";
import type { BinarySize, ToggleColor } from "../../shared/styles";

export type RadioBaseProps = {
  /**
   * 颜色
   * @default "primary"
   */
  color?: ToggleColor;

  /**
   * 大小
   * @default "md"
   */
  size?: BinarySize;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否必选
   * @default false
   */
  required?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;
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
};

export const [RadioGroupContext, useRadioGroup] = createSafeContext<RadioGroupContextValue>({
  name: "RadioGroupContext",
});
