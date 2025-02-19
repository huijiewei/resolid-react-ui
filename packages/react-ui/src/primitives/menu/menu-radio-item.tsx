import { ariaAttr, tx } from "../../utils";
import type { PolymorphicProps } from "../index";
import { MenuItem, type MenuItemProps } from "./menu-item";
import { MenuItemIndicatorContext } from "./menu-item-indicator-context";
import { useMenuRadioGroup } from "./menu-radio-group-context";

export type MenuRadioItemProps = MenuItemProps & {
  /**
   * 菜单单选项的价值
   */
  value: string | number;
};

export const MenuRadioItem = (props: PolymorphicProps<"div", MenuRadioItemProps, "role" | "tabIndex">) => {
  const { value, onSelect, children, className, ...rest } = props;

  const group = useMenuRadioGroup();
  const checked = value == group.value;

  return (
    <MenuItemIndicatorContext value={{ checked }}>
      <MenuItem
        role="menuitemradio"
        onSelect={() => {
          group.onChange?.(value);
          onSelect?.();
        }}
        label={value as string}
        aria-checked={ariaAttr(checked)}
        className={tx("relative pl-6", className)}
        {...rest}
      >
        {children}
      </MenuItem>
    </MenuItemIndicatorContext>
  );
};
