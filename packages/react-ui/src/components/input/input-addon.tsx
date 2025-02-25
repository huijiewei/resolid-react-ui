import type { PrimitiveProps } from "../../primitives";
import { inputTextShareStyles } from "../../shared/styles";
import { tx } from "../../utils";
import { useInputGroup } from "./input-group-context";
import { inputGroupStyles, inputSizeStyles } from "./input.styles";

export const InputAddon = (props: PrimitiveProps<"div">) => {
  const { className, children, ...rest } = props;

  const group = useInputGroup();

  return (
    <div
      className={tx(
        "bg-bg-subtlest text-fg-muted border-bd-normal inline-flex items-center text-nowrap rounded-md border",
        inputGroupStyles,
        inputSizeStyles[group.size],
        inputTextShareStyles[group.size],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
