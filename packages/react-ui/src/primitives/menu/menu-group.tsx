import type { PrimitiveProps } from "../index";

export const MenuGroup = (props: PrimitiveProps<"div">) => {
  const { children, ...rest } = props;

  return (
    <div role={"group"} {...rest}>
      {children}
    </div>
  );
};
