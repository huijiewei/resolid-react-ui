import type { RefObject } from "react";
import { createSafeContext } from "../../primitives";
import type { PopperFloatingContextValue } from "../popper/popper-floating-context";
import type { MenuItemContextValue } from "./menu-item-context";

export type MenuFloatingContextValue = PopperFloatingContextValue &
  MenuItemContextValue & {
    nested: boolean;
    duration: number;
    lockScroll: boolean;
    elementsRef: RefObject<(HTMLElement | null)[]>;
    labelsRef: RefObject<(string | null)[]>;
  };

export const [MenuFloatingContext, useMenuFloating] = createSafeContext<MenuFloatingContextValue>({
  strict: true,
  name: "MenuFloatingContext",
});
