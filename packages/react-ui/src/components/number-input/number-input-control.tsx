import type { PrimitiveProps } from "../../primitives";
import { AngleDownIcon, AngleUpIcon } from "../../shared/icons";
import { inputTextShareStyles } from "../../shared/styles";
import { tx } from "../../utils";
import type { InputSize } from "../input/input.styles";

export const NumberInputControl = (
  props: PrimitiveProps<
    "button",
    { stepper: "increment" | "decrement"; size: InputSize; inputId: string },
    "type" | "children"
  >,
) => {
  const { className, disabled, stepper, size, inputId, ...rest } = props;

  return (
    <button
      type={"button"}
      tabIndex={-1}
      disabled={disabled}
      aria-label={`${stepper} value`}
      aria-controls={inputId}
      className={tx(
        "bg-bg-subtle pointer-events-auto flex h-full select-none appearance-none items-center justify-center transition-colors",
        disabled ? "opacity-60" : "hover:bg-bg-muted active:bg-bg-muted",
        stepper == "increment" && "rounded-tr-md",
        stepper == "decrement" && "rounded-br-md",
        inputTextShareStyles[size],
        className,
      )}
      {...rest}
    >
      {stepper == "increment" && <AngleUpIcon size={"0.875em"} />}
      {stepper == "decrement" && <AngleDownIcon size={"0.875em"} />}
    </button>
  );
};
