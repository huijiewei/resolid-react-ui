import { MenuContent } from "../menu/menu-content";
import { MenuGroup } from "../menu/menu-group";
import { MenuItemIndicator } from "../menu/menu-item-indicator";
import { MenuLabel } from "../menu/menu-label";
import { MenuRoot, type MenuRootProps } from "../menu/menu-root";
import { MenuSeparator } from "../menu/menu-separator";
import { MenuSubTrigger } from "../menu/menu-sub-trigger";
import { MenuTrigger } from "../menu/menu-trigger";
import { PopperArrow } from "../popper/popper-arrow";

export type DropdownMenuProps = MenuRootProps;

export const DropdownMenu = MenuRoot;
export const DropdownMenuTrigger = MenuTrigger;

export const DropdownMenuContent = MenuContent;
export const DropdownMenuArrow = PopperArrow;
export const DropdownMenuSeparator = MenuSeparator;

export const DropdownMenuGroup = MenuGroup;
export const DropdownMenuLabel = MenuLabel;

export const DropdownMenuItemIndicator = MenuItemIndicator;

export const DropdownMenuSubTrigger = MenuSubTrigger;
