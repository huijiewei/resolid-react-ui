import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export const MenuGroupLabel = (props: PrimitiveProps<"div">) => {
  const { children, className, ...rest } = props;

  return (
    <div className={tx("text-fg-muted flex w-full items-center px-2 py-1.5 outline-none", className)} {...rest}>
      {children}
    </div>
  );
};
