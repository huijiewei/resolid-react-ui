import type { ChangeEvent } from "react";
import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { isInputEvent } from "../../utils";
import { type RadioGroupBaseProps, RadioGroupContext } from "./radio-group-context";

type RadioGroupProps = RadioGroupBaseProps & {
  /**
   * 默认值
   */
  defaultValue?: string | number;

  /**
   * onChange 回调
   */
  onChange?: (value: string | number) => void;
};

export const RadioGroup = (props: PrimitiveProps<"div", RadioGroupProps, "role">) => {
  const { color, size, children, disabled, value, name, defaultValue = "", onChange, ...rest } = props;

  const [valueState, setValueState] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const handleChange = (eventOrValue: ChangeEvent<HTMLInputElement> | string | number) => {
    const nextValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;

    setValueState(nextValue);
  };

  const handleReset = () => {
    setValueState(defaultValue);
  };

  const groupContext = {
    name,
    size,
    color,
    disabled,
    value: valueState,
    onChange: handleChange,
    onReset: handleReset,
  };

  return (
    <div role={"radiogroup"} {...rest}>
      <RadioGroupContext value={groupContext}>{children}</RadioGroupContext>
    </div>
  );
};
