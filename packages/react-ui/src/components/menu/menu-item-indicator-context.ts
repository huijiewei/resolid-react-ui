import { createSafeContext } from "../../primitives";

export type CheckedState = boolean | "indeterminate";

type MenuItemIndicatorContextValue = {
  checked: CheckedState;
};

export const [MenuItemIndicatorContext, useMenuItemIndicator] = createSafeContext<MenuItemIndicatorContextValue>({
  strict: true,
  name: "MenuItemIndicatorContext",
});
