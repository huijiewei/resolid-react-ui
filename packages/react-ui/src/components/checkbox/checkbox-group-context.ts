import type { ChangeEvent } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";
import type { BinarySize, ToggleColor } from "../../shared/styles";
import type { FormFieldProps } from "../../shared/types";

export type CheckboxBaseProps = FormFieldProps & {
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
};

export type CheckboxGroupBaseProps = {
  /**
   * 可控值
   */
  value?: (string | number)[];
} & CheckboxBaseProps;

export type CheckboxGroupContextValue = CheckboxGroupBaseProps & {
  onChange: (event: ChangeEvent<HTMLInputElement> | string | number) => void;
};

const desc = createSafeContext<CheckboxGroupContextValue>({
  name: "CheckboxGroupContext",
});

export const CheckboxGroupContext: SafeContext<CheckboxGroupContextValue> = desc[0];
export const useCheckboxGroup: UseSafeContext<CheckboxGroupContextValue> = desc[1];
