import type { PrimitiveProps } from "../../primitives";

export const MenuGroup = (props: PrimitiveProps<"div">) => {
  const { children, ...rest } = props;

  return (
    <div role={"group"} {...rest}>
      {children}
    </div>
  );
};
