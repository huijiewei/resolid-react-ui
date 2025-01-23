import type { PrimitiveProps } from "../../primitives";
import { cx } from "../../utils";
import { ButtonGroupContext, type ButtonGroupContextValue } from "./button-group-context";

export type ButtonGroupProps = ButtonGroupContextValue;

export const ButtonGroup = (props: PrimitiveProps<"div", ButtonGroupProps, "role">) => {
  const { children, orientation = "horizontal", variant, color, size, disabled, className, ...rest } = props;

  return (
    <div
      role={"group"}
      className={cx(
        "inline-flex",
        orientation == "horizontal" ? "flex-row -space-x-px" : "flex-col -space-y-px",
        className,
      )}
      {...rest}
    >
      <ButtonGroupContext value={{ variant, color, size, disabled, orientation }}>{children}</ButtonGroupContext>
    </div>
  );
};
