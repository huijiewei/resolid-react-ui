import type { PrimitiveProps } from "../../primitives";
import { AngleDownIcon } from "../../shared/icons";
import { inputTextShareStyles } from "../../shared/styles";
import { tx } from "../../utils";
import { type SelectSize, selectSizeStyles } from "./select.styles";

export type NativeSelectProps = {
  /**
   * 大小
   * @default 'md'
   */
  size?: SelectSize;

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;
};

export const NativeSelect = (props: PrimitiveProps<"select", NativeSelectProps>) => {
  const { size = "md", disabled = false, invalid = false, children, className, ...rest } = props;

  const sizeStyle = selectSizeStyles[size];
  const textStyle = inputTextShareStyles[size];

  return (
    <div className={tx("relative", textStyle)}>
      <select
        disabled={disabled}
        className={tx(
          "bg-bg-normal border-bd-normal w-full appearance-none rounded-md border outline-transparent transition-colors",
          "focus:border-bg-primary-emphasis focus:outline-bg-primary-emphasis/70 focus:outline-1",
          invalid && "border-bd-invalid",
          !invalid && !disabled && "hover:border-bd-hovered",
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
