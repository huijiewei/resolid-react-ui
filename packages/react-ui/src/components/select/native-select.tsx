import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { inputTextShareStyles } from "../../shared/styles";
import type { FormInputFieldProps } from "../../shared/types";
import { tx } from "../../utils";
import { inputHeightStyles, inputStyles } from "../input/input.styles";
import { SelectChevron } from "./select-chevron";
import { type SelectSize, selectSizeStyles } from "./select.styles";

export type NativeSelectProps = FormInputFieldProps & {
  /**
   * 大小
   * @default 'md'
   */
  size?: SelectSize;
};

export const NativeSelect = (props: PrimitiveProps<"select", NativeSelectProps, "multiple">): JSX.Element => {
  const { size = "md", disabled = false, invalid = false, children, className, ...rest } = props;

  const sizeStyle = selectSizeStyles[size];

  return (
    <div className={tx("relative", inputTextShareStyles[size])}>
      <select
        disabled={disabled}
        className={tx(
          "bg-bg-normal appearance-none",
          inputStyles({ disabled, invalid, focusable: true }),
          inputHeightStyles[size],
          sizeStyle.select,
          sizeStyle.native,
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <SelectChevron className={sizeStyle.chevron} />
    </div>
  );
};
