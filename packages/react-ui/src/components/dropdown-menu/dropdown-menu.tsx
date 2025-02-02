import { MenuContent } from "../menu/menu-content";
import { MenuGroup } from "../menu/menu-group";
import { MenuGroupLabel } from "../menu/menu-group-label";
import { MenuItemIndicator } from "../menu/menu-item-indicator";
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
export const DropdownMenuGroupLabel = MenuGroupLabel;

export const DropdownMenuItemIndicator = MenuItemIndicator;

export const DropdownMenuSubTrigger = MenuSubTrigger;
