import type { KeyboardEvent } from "react";
import type { PolymorphicProps } from "../../primitives";
import { MenuBaseItem, type MenuBaseItemProps } from "./menu-base-item";
import { useMenuItem } from "./menu-item-context";

export type MenuItemProps = MenuBaseItemProps & {
  closeOnSelect?: boolean;
  onClick?: () => void;
};

export const MenuItem = (props: PolymorphicProps<"div", MenuItemProps, "tabIndex">) => {
  const { menuEvents, closeOnSelect: menuCloseOnSelect } = useMenuItem();

  const { as, className, onClick, children, disabled = false, closeOnSelect = menuCloseOnSelect, ...rest } = props;

  const handleClick = () => {
    if (disabled) {
      return;
    }

    onClick?.();

    if (closeOnSelect) {
      menuEvents.emit("close");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    if (event.key == " " || event.key == "Enter") {
      event.preventDefault();
      event.stopPropagation();

      onClick?.();

      if (closeOnSelect) {
        menuEvents.emit("close");
      }
    }
  };

  return (
    <MenuBaseItem
      as={as}
      disabled={disabled}
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </MenuBaseItem>
  );
};
