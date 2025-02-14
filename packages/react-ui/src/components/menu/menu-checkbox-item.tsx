import type { ComponentProps, ElementType } from "react";
import type { PolymorphicProps } from "../../primitives";
import { ariaAttr, tx } from "../../utils";
import { MenuItem, type MenuItemProps } from "./menu-item";
import { type CheckedState, MenuItemIndicatorContext } from "./menu-item-indicator-context";

export type MenuCheckboxItemProps = MenuItemProps & {
  /**
   * 项目的受控选中状态
   */
  checked?: CheckedState;

  /**
   * 项目选中状态更改时调用的事件处理程序
   */
  onChange?: (checked: CheckedState) => void;
};

export const MenuCheckboxItem = <T extends ElementType = "div">(
  props: PolymorphicProps<T, MenuCheckboxItemProps, "role" | "tabIndex">,
) => {
  const { checked = false, className, onChange, onSelect, children, ...rest } = props;

  return (
    <MenuItemIndicatorContext value={{ checked }}>
      <MenuItem
        role="menuitemcheckbox"
        onSelect={() => {
          onChange?.(checked == "indeterminate" ? true : !checked);
          onSelect?.();
        }}
        aria-checked={checked == "indeterminate" ? "mixed" : ariaAttr(checked)}
        className={tx("relative pl-6", className)}
        {...(rest as ComponentProps<typeof MenuItem>)}
      >
        {children}
      </MenuItem>
    </MenuItemIndicatorContext>
  );
};
