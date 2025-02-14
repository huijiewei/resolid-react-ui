import type { KeyboardEvent } from "react";
import type { ButtonEvent } from "../../hooks";
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

  const { className, children, onSelect, disabled = false, closeOnSelect = menuCloseOnSelect, ...rest } = props;

  const handleClick = () => {
    if (disabled) {
      return;
    }

    onSelect?.();

    if (closeOnSelect) {
      menuEvents.emit("close");
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === " " && typingRef.current) {
      (e as ButtonEvent<KeyboardEvent>).preventButtonHandler();
    }
  };

  return (
    <MenuBaseItem disabled={disabled} className={className} onClick={handleClick} onKeyUp={handleKeyUp} {...rest}>
      {children}
    </MenuBaseItem>
  );
};
