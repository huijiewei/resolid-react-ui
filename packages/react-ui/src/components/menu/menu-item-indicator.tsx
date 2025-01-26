import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { useMenuItemIndicator } from "./menu-item-indicator-context";

export const MenuItemIndicator = (props: PrimitiveProps<"span">) => {
  const { className, children, ...rest } = props;

  const context = useMenuItemIndicator();

  return context.checked ? (
    <span className={tx("absolute left-0 inline-flex w-6 items-center justify-center", className)} {...rest}>
      {children}
    </span>
  ) : null;
};
