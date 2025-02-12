import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { useInputGroup } from "./input-group-context";
import { inputGroupStyles, inputSizeStyles } from "./input.styles";

export const InputAddon = (props: PrimitiveProps<"div">) => {
  const { className, children, ...rest } = props;

  const group = useInputGroup();

  return (
    <div
      className={tx(
        "bg-bg-subtlest text-fg-muted border-bd-normal flex items-center rounded-md border leading-none",
        inputGroupStyles,
        inputSizeStyles[group.size],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
