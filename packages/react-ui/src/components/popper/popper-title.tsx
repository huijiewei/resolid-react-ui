import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { usePopperAria } from "./popper-aria-context";

export const PopperTitle = (props: PrimitiveProps<"h2", EmptyObject, "id">) => {
  const { children, className, ...rest } = props;

  const { labelId } = usePopperAria();

  return (
    <h2 id={labelId} className={tx("font-bold", className)} {...rest}>
      {children}
    </h2>
  );
};
