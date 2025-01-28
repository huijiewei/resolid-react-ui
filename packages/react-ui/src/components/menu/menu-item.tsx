import type { ElementType, KeyboardEvent } from "react";
import type { ButtonEvent } from "../../hooks";
import type { PolymorphicProps } from "../../primitives";
import { MenuBaseItem, type MenuBaseItemProps } from "./menu-base-item";
import { useMenuItem } from "./menu-item-context";

export type MenuItemProps = MenuBaseItemProps & {
  closeOnSelect?: boolean;
  onClick?: () => void;
};

export const MenuItem = <T extends ElementType = "div">(props: PolymorphicProps<T, MenuItemProps, "tabIndex">) => {
  const { menuEvents, closeOnSelect: menuCloseOnSelect, typingRef } = useMenuItem();

  const { as, className, children, onClick, disabled = false, closeOnSelect = menuCloseOnSelect, ...rest } = props;

  const handleClick = () => {
    if (disabled) {
      return;
    }

    onClick?.();

    if (closeOnSelect) {
      menuEvents.emit("close");
    }
  };

  const handleKeyUp = (e: ButtonEvent<KeyboardEvent>) => {
    if (e.key === " " && typingRef.current) {
      e.preventButtonHandler();
    }
  };

  return (
    <MenuBaseItem
      as={as}
      disabled={disabled}
      className={className}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      {...(rest as PolymorphicProps<T, MenuBaseItemProps>)}
    >
      {children}
    </MenuBaseItem>
  );
};
