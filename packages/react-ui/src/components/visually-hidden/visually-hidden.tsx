import type { PrimitiveProps } from "../../primitives";
import { clsx } from "../../utils/clsx";

export const VisuallyHidden = (props: PrimitiveProps<"span">) => {
  const { children, className, ...rest } = props;

  return (
    <span {...rest} className={clsx("sr-only", className)}>
      {children}
    </span>
  );
};
