import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";
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
   * 字段的名称
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
   * 可控值
   */
  value?: string | number;
};

export type RadioGroupContextValue = RadioGroupBaseProps & {
  onChange: (value: string | number) => void;
};

const dest = createSafeContext<RadioGroupContextValue>({
  name: "RadioGroupContext",
});

export const RadioGroupContext: SafeContext<RadioGroupContextValue> = dest[0];
export const useRadioGroup: UseSafeContext<RadioGroupContextValue> = dest[1];
