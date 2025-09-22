import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type CheckedState = boolean | "indeterminate";

type MenuItemIndicatorContextValue = {
  checked: CheckedState;
};

const dest = createSafeContext<MenuItemIndicatorContextValue>({
  name: "MenuItemIndicatorContext",
});

export const MenuItemIndicatorContext: SafeContext<MenuItemIndicatorContextValue> = dest[0];
export const useMenuItemIndicator: UseSafeContext<MenuItemIndicatorContextValue> = dest[1];
