import type { EmptyObject, PolymorphicProps } from "../../primitives";
import { tx } from "../../utils";
import { usePopperAria } from "./popper-aria-context";

export const PopperTitle = (props: PolymorphicProps<"h2", EmptyObject, "id">) => {
  const { as: Component = "h2", children, className, ...rest } = props;

  const { labelId } = usePopperAria();

  return (
    <Component id={labelId} className={tx("font-bold", className)} {...rest}>
      {children}
    </Component>
  );
};
