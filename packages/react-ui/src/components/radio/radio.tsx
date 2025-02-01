import type { CSSProperties, ChangeEvent } from "react";
import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import {
  binaryColorShareStyles,
  binarySizeShareStyles,
  disabledShareStyles,
  inputTextShareStyles,
  toggleControlShareStyles,
  toggleLabelShareStyles,
} from "../../shared/styles";
import { ariaAttr, tx } from "../../utils";
import { type RadioBaseProps, useRadioGroup } from "./radio-group-context";

export type RadioProps = RadioBaseProps & {
  /**
   * 可控值
   */
  checked?: boolean;

  /**
   * 默认值
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * onChange 回调
   */
  onChange?: (checked: boolean) => void;

  /**
   * 值
   */
  value?: string | number;

  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;

  /**
   * 间距
   * @default "0.5em"
   */
  spacing?: string | number;
};

export const Radio = (props: PrimitiveProps<"input", RadioProps, "role" | "type">) => {
  const group = useRadioGroup();

  const {
    name = group?.name,
    size = group?.size || "md",
    color = group?.color || "primary",
    disabled = group?.disabled || false,
    readOnly = group?.readOnly || false,
    required = group?.required || false,
    invalid = false,
    spacing = "0.5em",
    checked,
    defaultChecked = false,
    onChange,
    value,
    style,
    className,
    children,
    ref,
    ...rest
  } = props;

  const [checkedState, setCheckedState] = useControllableState({
    value: group ? group.value == value : checked,
    defaultValue: defaultChecked,
    onChange,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.defaultPrevented || disabled || readOnly) {
      return;
    }

    setCheckedState(event.target.checked);

    group?.onChange(event);
  };

  const sizeStyle = binarySizeShareStyles[size];
  const colorStyle = binaryColorShareStyles[color];
  const labelSizeStyle = inputTextShareStyles[size];

  return (
    <label
      style={
        {
          "--sv": `${spacing}`,
          ...style,
        } as CSSProperties
      }
      className={tx(toggleLabelShareStyles, className)}
    >
      <input
        ref={ref}
        name={name}
        className={"peer sr-only"}
        value={value}
        type={"radio"}
        checked={checkedState}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        {...rest}
      />
      <span
        role={"radio"}
        aria-checked={ariaAttr(checkedState)}
        aria-hidden={true}
        className={tx(
          "items-center justify-center rounded-full",
          toggleControlShareStyles,
          !disabled && !readOnly && "cursor-pointer",
          colorStyle.focus,
          invalid ? "border-bd-invalid" : checkedState ? colorStyle.border : "border-bd-normal",
          checkedState ? ["text-fg-emphasized", colorStyle.checked] : "bg-bg-normal",
          sizeStyle,
          disabled && disabledShareStyles,
          checkedState &&
            "before:relative before:inline-block before:h-1/2 before:w-1/2 before:rounded-[50%] before:bg-current before:content-['']",
        )}
      />
      {children && <div className={tx("select-none", labelSizeStyle, disabled && disabledShareStyles)}>{children}</div>}
    </label>
  );
};
