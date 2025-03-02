import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import type { Orientation } from "../../shared/types";
import { ariaAttr, tx } from "../../utils";
import { type RadioGroupBaseProps, RadioGroupContext } from "./radio-group-context";

export type RadioGroupProps = RadioGroupBaseProps & {
  /**
   * 默认值
   */
  defaultValue?: string | number;

  /**
   * onChange 回调
   */
  onChange?: (value: string | number) => void;

  /**
   * 方向
   * @default 'horizontal'
   */
  orientation?: Orientation;
};

export const RadioGroup = (props: PrimitiveProps<"div", RadioGroupProps, "role">) => {
  const {
    color = "primary",
    size = "md",
    disabled = false,
    required = false,
    readOnly = false,
    invalid = false,
    orientation = "horizontal",
    name,
    value,
    defaultValue = "",
    onChange,
    className,
    children,
    ...rest
  } = props;

  const [valueState, setValueState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const handleChange = (value: string | number) => {
    if (disabled || readOnly) {
      return;
    }

    setValueState(value);
  };

  const groupContext = {
    name,
    size,
    color,
    disabled,
    required,
    readOnly,
    invalid,
    value: valueState,
    onChange: handleChange,
  };

  return (
    <div
      role={"radiogroup"}
      aria-disabled={ariaAttr(disabled)}
      aria-required={ariaAttr(required)}
      aria-readonly={ariaAttr(readOnly)}
      aria-invalid={ariaAttr(invalid)}
      aria-orientation={orientation}
      className={tx("inline-flex", orientation == "horizontal" ? "flex-row" : "flex-col", className)}
      {...rest}
    >
      <RadioGroupContext value={groupContext}>{children}</RadioGroupContext>
    </div>
  );
};
