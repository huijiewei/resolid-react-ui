import type { ChangeEvent, CSSProperties } from "react";
import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import {
  disabledShareStyles,
  inputTextShareStyles,
  type ToggleColor,
  toggleColorShareStyles,
  toggleControlShareStyles,
  toggleLabelShareStyles,
} from "../../shared/styles";
import { ariaAttr, tx } from "../../utils";
import { type SwitchSize, switchSizeStyles } from "./switch.styles";

export type SwitchProps = {
  /**
   * 颜色
   * @default 'primary'
   */
  color?: ToggleColor;

  /**
   * 大小
   * @default 'md'
   */
  size?: SwitchSize;

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
   * 是否禁用
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否无效
   * @default false
   */
  invalid?: boolean;

  /**
   * 是否只读
   * @default false
   */
  readOnly?: boolean;

  /**
   * 间距
   * @default '0.5em'
   */
  spacing?: string | number;
};

export const Switch = (props: PrimitiveProps<"input", SwitchProps, "role" | "type">) => {
  const {
    color = "primary",
    size = "md",
    spacing = "0.5em",
    disabled = false,
    invalid = false,
    readOnly = false,
    checked,
    defaultChecked = false,
    onChange,
    value,
    children,
    className,
    ref,
    ...rest
  } = props;

  const [checkedState, setCheckedState] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (readOnly || disabled) {
      event.preventDefault();
      return;
    }

    setCheckedState(event.target.checked);
  };

  const sizeStyle = switchSizeStyles[size];
  const colorStyle = toggleColorShareStyles[color];
  const labelSizeStyle = inputTextShareStyles[size];

  return (
    <label
      style={
        {
          "--sv": `${spacing}`,
        } as CSSProperties
      }
      className={tx(toggleLabelShareStyles, className)}
    >
      <input
        ref={ref}
        className={"peer sr-only"}
        value={value}
        type="checkbox"
        checked={checkedState}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        aria-invalid={ariaAttr(invalid)}
        role={"switch"}
        {...rest}
      />
      <span
        aria-checked={ariaAttr(checkedState)}
        aria-hidden={true}
        className={tx(
          "inline-flex shrink-0 justify-start rounded-full border-2",
          toggleControlShareStyles,
          !disabled && !readOnly && "cursor-pointer",
          colorStyle.focus,
          sizeStyle.track,
          checkedState ? colorStyle.checked : "bg-bg-muted",
          disabled && disabledShareStyles,
          invalid ? "border-bg-danger-emphasis/70" : "border-transparent",
        )}
      >
        <span
          className={tx(
            "bg-bg-normal aspect-square h-full rounded-full transition-transform",
            checkedState && sizeStyle.thumb,
          )}
        />
      </span>
      {children && <div className={tx("select-none", labelSizeStyle, disabled && disabledShareStyles)}>{children}</div>}
    </label>
  );
};
