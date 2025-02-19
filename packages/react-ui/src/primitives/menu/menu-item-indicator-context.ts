import { createSafeContext } from "../index";

export type CheckedState = boolean | "indeterminate";

type MenuItemIndicatorContextValue = {
  checked: CheckedState;
};

export const [MenuItemIndicatorContext, useMenuItemIndicator] = createSafeContext<MenuItemIndicatorContextValue>({
  name: "MenuItemIndicatorContext",
});
