import type { PropsWithChildren } from "react";
import { MenuCheckboxItem } from "../menu/menu-checkbox-item";
import { MenuContent } from "../menu/menu-content";
import { MenuGroup } from "../menu/menu-group";
import { MenuGroupLabel } from "../menu/menu-group-label";
import { MenuItem } from "../menu/menu-item";
import { MenuItemIndicator } from "../menu/menu-item-indicator";
import { MenuRadioGroup } from "../menu/menu-radio-group";
import { MenuRadioItem } from "../menu/menu-radio-item";
import { MenuRoot, type MenuRootProps } from "../menu/menu-root";
import { MenuSeparator } from "../menu/menu-separator";
import { MenuSubmenuTrigger } from "../menu/menu-submenu-trigger";
import { MenuTrigger } from "../menu/menu-trigger";
import { PopperArrow } from "../popper/popper-arrow";

export type DropdownMenuProps = Omit<MenuRootProps, "lockScroll">;

export const DropdownMenu = (props: PropsWithChildren<DropdownMenuProps>) => <MenuRoot {...props} />;

export const DropdownMenuTrigger = MenuTrigger;

export const DropdownMenuContent = MenuContent;

export const DropdownMenuArrow = PopperArrow;

export const DropdownMenuSeparator = MenuSeparator;

export const DropdownMenuGroup = MenuGroup;

export const DropdownMenuGroupLabel = MenuGroupLabel;

export const DropdownMenuItem = MenuItem;

export const DropdownMenuSubmenuTrigger = MenuSubmenuTrigger;

export const DropdownMenuItemIndicator = MenuItemIndicator;

export const DropdownMenuCheckboxItem = MenuCheckboxItem;

export const DropdownMenuRadioGroup = MenuRadioGroup;

export const DropdownMenuRadioItem = MenuRadioItem;
