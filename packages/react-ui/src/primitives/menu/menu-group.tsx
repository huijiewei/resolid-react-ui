import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../index";

export const MenuGroup = (props: PrimitiveProps<"div">): JSX.Element => {
  const { children, ...rest } = props;

  return (
    <div role={"group"} {...rest}>
      {children}
    </div>
  );
};
