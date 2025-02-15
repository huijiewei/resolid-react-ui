import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export const BreadcrumbItem = (props: PrimitiveProps<"li">) => {
  const { className, children, ...rest } = props;

  return (
    <li className={tx("inline-flex items-center", className)} {...rest}>
      {children}
    </li>
  );
};
