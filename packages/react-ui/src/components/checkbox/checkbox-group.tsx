import type { ChangeEvent } from "react";
import { useControllableState } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { isInputEvent } from "../../utils";
import { type CheckboxGroupBaseProps, CheckboxGroupContext } from "./checkbox-group-context";

export type CheckboxGroupProps = {
  /**
   * 默认值
   */
  defaultValue?: (string | number)[];

  /**
   * onChange 回调
   */
  onChange?: (value: (string | number)[]) => void;
} & CheckboxGroupBaseProps;

export const CheckboxGroup = (props: PrimitiveProps<"div", CheckboxGroupProps, "role">) => {
  const {
    color = "primary",
    size = "md",
    disabled = false,
    name,
    value,
    defaultValue = [],
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
    if (!valueState) {
      return;
    }

    const inputEvent = isInputEvent(eventOrValue);

    const checked = inputEvent ? eventOrValue.target.checked : !valueState.includes(eventOrValue);

    const selectedValue = inputEvent ? eventOrValue.target.value : eventOrValue;

    const nextValue = checked
      ? [...valueState, selectedValue]
      : valueState.filter((v) => String(v) !== String(selectedValue));

    setValueState(nextValue);
  };

  const context = {
    name,
    size,
    color,
    disabled,
    value: valueState,
    onChange: handleChange,
  };

  return (
    <div role={"group"} {...rest}>
      <CheckboxGroupContext value={context}>{children}</CheckboxGroupContext>
    </div>
  );
};
