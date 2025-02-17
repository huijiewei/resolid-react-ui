import type { KeyboardEvent, MouseEvent } from "react";
import type { HtmlProps, PolymorphicProps } from "../../primitives";
import { MenuBaseItem, type MenuBaseItemProps } from "./menu-base-item";
import { useMenuItem } from "./menu-item-context";

export type MenuItemProps = MenuBaseItemProps & {
  /**
   * 选择项目后, 菜单将关闭
   */
  closeOnSelect?: boolean;

  /**
   * 当用户选择一个项目（通过鼠标或键盘）时调用事件处理程序
   */
  onSelect?: () => void;
};

type MenuItemHtmlProps = HtmlProps<"div", MenuItemProps, "tabIndex">;

export const MenuItem = (props: PolymorphicProps<MenuItemHtmlProps, MenuItemProps>) => {
  const { menuEvents, closeOnSelect: menuCloseOnSelect, typingRef } = useMenuItem();

  const {
    className,
    children,
    onClick,
    onSelect,
    disabled = false,
    closeOnSelect = menuCloseOnSelect,
    ...rest
  } = props;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
    onSelect?.();

    if (closeOnSelect) {
      menuEvents.emit("close");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.target === e.currentTarget && e.key === " ") {
      e.preventDefault();
    }

    if (e.target === e.currentTarget && e.key === "Enter") {
      handleClick(e as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.target === e.currentTarget && !typingRef.current && e.key === " ") {
      handleClick(e as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <MenuBaseItem
      disabled={disabled}
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      {...rest}
    >
      {children}
    </MenuBaseItem>
  );
};
