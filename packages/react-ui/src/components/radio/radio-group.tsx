import type { ChangeEvent } from "react";
import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { isInputEvent } from "../../utils";
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
  orientation?: "horizontal" | "vertical";
};

export const RadioGroup = (props: PrimitiveProps<"div", RadioGroupProps, "role">) => {
  const {
    color = "primary",
    size = "md",
    disabled = false,
    required = false,
    readOnly = false,
    orientation = "horizontal",
    name,
    value,
    defaultValue = "",
    onChange,
    children,
    ...rest
  } = props;

  const [valueState, setValueState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const handleChange = (eventOrValue: ChangeEvent<HTMLInputElement> | string | number) => {
    const nextValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;

    setValueState(nextValue);
  };

  const groupContext = {
    name,
    size,
    color,
    disabled,
    required,
    readOnly,
    value: valueState,
    onChange: handleChange,
  };

  return (
    <div role={"radiogroup"} aria-orientation={orientation} {...rest}>
      <RadioGroupContext value={groupContext}>{children}</RadioGroupContext>
    </div>
  );
};
