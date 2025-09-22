import type { JSX } from "react/jsx-runtime";
import { tx } from "../../utils";
import type { PrimitiveProps } from "../index";
import { useMenuItemIndicator } from "./menu-item-indicator-context";

export const MenuItemIndicator = (props: PrimitiveProps<"span">): JSX.Element | null => {
  const { className, children, ...rest } = props;

  const context = useMenuItemIndicator();

  return context.checked ? (
    <span className={tx("absolute left-0 inline-flex w-6 items-center justify-center", className)} {...rest}>
      {children}
    </span>
  ) : null;
};
