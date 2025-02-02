import type { ChangeEvent } from "react";
import { createSafeContext } from "../../primitives";
import type { BinarySize, ToggleColor } from "../../shared/styles";

export type CheckboxBaseProps = {
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

export type CheckboxGroupBaseProps = CheckboxBaseProps & {
  /**
   * 多选中输入字段的名称
   */
  name?: string;

  /**
   * 选中的值
   */
  value?: (string | number)[];
};

export type CheckboxGroupContextValue = CheckboxGroupBaseProps & {
  onChange: (event: ChangeEvent<HTMLInputElement> | string | number) => void;
};

export const [CheckboxGroupContext, useCheckboxGroup] = createSafeContext<CheckboxGroupContextValue>({
  name: "CheckboxGroupContext",
});
