import type { PrimitiveProps } from "../../primitives";
import { AngleDownIcon } from "../../shared/icons";
import { inputTextShareStyles } from "../../shared/styles";
import type { FormInputFieldProps } from "../../shared/types";
import { tx } from "../../utils";
import { inputHeightStyles } from "../input/input.styles";
import { type SelectSize, selectSizeStyles } from "./select.styles";

export type NativeSelectProps = FormInputFieldProps & {
  /**
   * 大小
   * @default 'md'
   */
  size?: SelectSize;
};

export const NativeSelect = (props: PrimitiveProps<"select", NativeSelectProps>) => {
  const { size = "md", disabled = false, invalid = false, children, className, ...rest } = props;

  const sizeStyle = selectSizeStyles[size];

  return (
    <div className={tx("relative", inputTextShareStyles[size])}>
      <select
        disabled={disabled}
        className={tx(
          "bg-bg-normal appearance-none rounded-md border",
          "outline-1 outline-transparent transition-colors",
          "focus:border-bg-primary-emphasis focus:outline-bg-primary-emphasis/70",
          invalid ? "border-bd-invalid" : "border-bd-normal",
          !invalid && !disabled && "not-focus:hover:border-bd-hovered",
          disabled && "opacity-60",
          inputHeightStyles[size],
          sizeStyle.select,
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <span
        className={tx(
          "pointer-events-none absolute bottom-0 right-0 top-0 flex items-center justify-center",
          sizeStyle.chevron,
        )}
      >
        <AngleDownIcon className={"text-fg-subtle"} />
      </span>
    </div>
  );
};
