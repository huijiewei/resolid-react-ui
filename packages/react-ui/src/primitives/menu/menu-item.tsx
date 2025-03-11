import { getInteractiveHandlers } from "../../shared/utils";
import type { PolymorphicProps } from "../index";
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

export const MenuItem = (props: PolymorphicProps<"div", MenuItemProps, "tabIndex">) => {
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

  const { handleClick, handleKeyUp, handleKeyDown } = getInteractiveHandlers({
    disabled,
    typing: typingRef.current,
    onClick: (e) => {
      onClick?.(e);
      onSelect?.();

      if (closeOnSelect) {
        menuEvents.emit("close");
      }
    },
  });

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
