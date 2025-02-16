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
};

export type RadioGroupBaseProps = RadioBaseProps & {
  /**
   * 单选中输入字段的名称
   */
  name?: string;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;

  /**
   * 是否必选
   * @default false
   */
  required?: boolean;

  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;

  /**
   * 值
   */
  value?: string | number;
};

export type RadioGroupContextValue = RadioGroupBaseProps & {
  onChange: (value: string | number) => void;
};

export const [RadioGroupContext, useRadioGroup] = createSafeContext<RadioGroupContextValue>({
  name: "RadioGroupContext",
});
