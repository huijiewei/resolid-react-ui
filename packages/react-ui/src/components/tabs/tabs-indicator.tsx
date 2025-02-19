import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export const TabsIndicator = (props: PrimitiveProps<"div", EmptyObject, "role" | "children">) => {
  const { className, ...rest } = props;

  return (
    <div
      role={"presentation"}
      className={tx("absolute transition-all duration-200 ease-in-out", className)}
      {...rest}
    />
  );
};
