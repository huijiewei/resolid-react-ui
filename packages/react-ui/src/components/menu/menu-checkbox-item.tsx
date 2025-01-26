import type { PolymorphicProps } from "../../primitives";
import { ariaAttr, tx } from "../../utils";
import { MenuItem, type MenuItemProps } from "./menu-item";
import { type CheckedState, MenuItemIndicatorContext } from "./menu-item-indicator-context";

export type MenuCheckboxItemProps = MenuItemProps & {
  checked?: CheckedState;
  onChange?: (checked: CheckedState) => void;
};

export const MenuCheckboxItem = (props: PolymorphicProps<"div", MenuCheckboxItemProps, "role" | "tabIndex">) => {
  const { checked = false, className, onChange, onClick, children, ...rest } = props;

  return (
    <MenuItemIndicatorContext value={{ checked }}>
      <MenuItem
        role="menuitemcheckbox"
        onClick={() => {
          onChange?.(checked == "indeterminate" ? true : !checked);
          onClick?.();
        }}
        aria-checked={checked == "indeterminate" ? "mixed" : ariaAttr(checked)}
        className={tx("relative pl-6", className)}
        {...rest}
      >
        {children}
      </MenuItem>
    </MenuItemIndicatorContext>
  );
};
