import { ariaAttr, tx } from "../../utils";
import type { PolymorphicProps } from "../index";
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

export const MenuCheckboxItem = (props: PolymorphicProps<"div", MenuCheckboxItemProps, "role" | "tabIndex">) => {
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
        {...rest}
      >
        {children}
      </MenuItem>
    </MenuItemIndicatorContext>
  );
};
