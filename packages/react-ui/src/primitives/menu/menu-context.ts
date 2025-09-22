import type { FloatingRootContext } from "@floating-ui/react";
import type { RefObject } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";
import type { MenuItemContextValue } from "./menu-item-context";

export type MenuContextValue = MenuItemContextValue & {
  context: FloatingRootContext;
  nested: boolean;
  labelsRef: RefObject<(string | null)[]>;
  elementsRef: RefObject<(HTMLElement | null)[]>;
};

const dest = createSafeContext<MenuContextValue>({
  name: "MenuContext",
});

export const MenuContext: SafeContext<MenuContextValue> = dest[0];
export const useMenu: UseSafeContext<MenuContextValue> = dest[1];
