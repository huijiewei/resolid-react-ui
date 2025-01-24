import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export const VisuallyHidden = (props: PrimitiveProps<"span">) => {
  const { children, className, ...rest } = props;

  return (
    <span {...rest} className={tx("sr-only", className)}>
      {children}
    </span>
  );
};
