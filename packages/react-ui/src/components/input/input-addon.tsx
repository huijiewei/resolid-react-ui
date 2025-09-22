import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { inputTextShareStyles } from "../../shared/styles";
import { hasBackgroundClass } from "../../shared/utils";
import { tx } from "../../utils";
import { useInputGroup } from "./input-group-context";
import { inputGroupStyles, inputSizeStyles } from "./input.styles";

export const InputAddon = (props: PrimitiveProps<"div">): JSX.Element => {
  const { className, children, ...rest } = props;

  const group = useInputGroup();

  return (
    <div
      className={tx(
        "text-fg-muted border-bd-normal inline-flex items-center text-nowrap rounded-md border",
        inputGroupStyles,
        inputSizeStyles[group.size],
        inputTextShareStyles[group.size],
        !hasBackgroundClass(className) && "bg-bg-subtlest",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
