import type { JSX } from "react/jsx-runtime";
import { tx } from "../../utils";
import type { PrimitiveProps } from "../index";

export const MenuLabel = (props: PrimitiveProps<"div">): JSX.Element => {
  const { children, className, ...rest } = props;

  return (
    <div className={tx("text-fg-muted flex w-full items-center px-2 py-1.5 outline-none", className)} {...rest}>
      {children}
    </div>
  );
};
