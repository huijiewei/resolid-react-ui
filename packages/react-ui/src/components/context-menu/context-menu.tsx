import { MenuContent } from "../menu/menu-content";
import { MenuGroup } from "../menu/menu-group";
import { MenuItemIndicator } from "../menu/menu-item-indicator";
import { MenuLabel } from "../menu/menu-label";
import { MenuRoot, type MenuRootProps } from "../menu/menu-root";
import { MenuSeparator } from "../menu/menu-separator";
import { MenuSubTrigger } from "../menu/menu-sub-trigger";

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
