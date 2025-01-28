import type { PolymorphicProps } from "../../primitives";
import { ariaAttr, tx } from "../../utils";
import { MenuItem, type MenuItemProps } from "./menu-item";
import { MenuItemIndicatorContext } from "./menu-item-indicator-context";
import { useMenuRadioGroup } from "./menu-radio-group-context";

export type MenuRadioItemProps = MenuItemProps & {
  value: string | number;
};

export const MenuRadioItem = (props: PolymorphicProps<"div", MenuRadioItemProps, "role" | "tabIndex">) => {
  const { value, onClick, children, className, ...rest } = props;

  const group = useMenuRadioGroup();
  const checked = value == group.value;

  return (
    <MenuItemIndicatorContext value={{ checked }}>
      <MenuItem
        role="menuitemradio"
        onClick={() => {
          group.onChange?.(value);
          onClick?.();
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
