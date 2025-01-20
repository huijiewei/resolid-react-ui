import type { PrimitiveProps } from "../../primitives";
import { cx } from "../../utils";

export const VisuallyHidden = (props: PrimitiveProps<"span">) => {
  const { children, className, ...rest } = props;

  return (
    <span {...rest} className={cx("sr-only", className)}>
      {children}
    </span>
  );
};
