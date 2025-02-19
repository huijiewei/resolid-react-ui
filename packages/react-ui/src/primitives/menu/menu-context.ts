import type { FloatingRootContext } from "@floating-ui/react";
import type { RefObject } from "react";
import { createSafeContext } from "../index";
import type { MenuItemContextValue } from "./menu-item-context";

export type MenuContextValue = MenuItemContextValue & {
  context: FloatingRootContext;
  nested: boolean;
  labelsRef: RefObject<(string | null)[]>;
  elementsRef: RefObject<(HTMLElement | null)[]>;
};

export const [MenuContext, useMenu] = createSafeContext<MenuContextValue>({
  name: "MenuContext",
});
