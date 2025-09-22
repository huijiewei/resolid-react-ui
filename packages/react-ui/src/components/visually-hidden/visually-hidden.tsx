import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export const VisuallyHidden = (props: PrimitiveProps<"span">): JSX.Element => {
  const { className, ...rest } = props;

  return <span className={tx("sr-only", className)} {...rest} />;
};
