import { MenuContent } from "../../primitives/menu/menu-content";
import { MenuGroup } from "../../primitives/menu/menu-group";
import { MenuItemIndicator } from "../../primitives/menu/menu-item-indicator";
import { MenuLabel } from "../../primitives/menu/menu-label";
import { MenuRoot, type MenuRootProps } from "../../primitives/menu/menu-root";
import { MenuSeparator } from "../../primitives/menu/menu-separator";
import { MenuSubTrigger } from "../../primitives/menu/menu-sub-trigger";
import { MenuTrigger } from "../../primitives/menu/menu-trigger";
import { PopperArrow } from "../../primitives/popper/popper-arrow";

export type DropdownMenuProps = MenuRootProps;

export const DropdownMenu: typeof MenuRoot = MenuRoot;

export { DropdownMenuCheckboxItem } from "./dropdown-menu-checkbox-item";
export { DropdownMenuItem } from "./dropdown-menu-item";
export { DropdownMenuRadioGroup } from "./dropdown-menu-radio-group";
export { DropdownMenuRadioItem } from "./dropdown-menu-radio-item";

export const DropdownMenuTrigger: typeof MenuTrigger = MenuTrigger;
export const DropdownMenuContent: typeof MenuContent = MenuContent;
export const DropdownMenuArrow: typeof PopperArrow = PopperArrow;
export const DropdownMenuSeparator: typeof MenuSeparator = MenuSeparator;
export const DropdownMenuGroup: typeof MenuGroup = MenuGroup;
export const DropdownMenuLabel: typeof MenuLabel = MenuLabel;
export const DropdownMenuItemIndicator: typeof MenuItemIndicator = MenuItemIndicator;
export const DropdownMenuSubTrigger: typeof MenuSubTrigger = MenuSubTrigger;
