import { MenuContent } from "../../primitives/menu/menu-content";
import { MenuGroup } from "../../primitives/menu/menu-group";
import { MenuItemIndicator } from "../../primitives/menu/menu-item-indicator";
import { MenuLabel } from "../../primitives/menu/menu-label";
import { MenuRoot, type MenuRootProps } from "../../primitives/menu/menu-root";
import { MenuSeparator } from "../../primitives/menu/menu-separator";
import { MenuSubTrigger } from "../../primitives/menu/menu-sub-trigger";

export type ContextMenuProps = Omit<MenuRootProps, "placement" | "preventScroll">;

export const ContextMenu = (props: ContextMenuProps) => {
  return <MenuRoot preventScroll {...props} />;
};

export { ContextMenuTrigger } from "./context-menu-trigger";

export const ContextMenuContent = MenuContent;
export const ContextMenuSeparator = MenuSeparator;

export const ContextMenuGroup = MenuGroup;
export const ContextMenuLabel = MenuLabel;

export const ContextMenuItemIndicator = MenuItemIndicator;

export const ContextMenuSubTrigger = MenuSubTrigger;
