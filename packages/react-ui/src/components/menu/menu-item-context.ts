import type { FloatingEvents } from "@floating-ui/react";
import type { HTMLProps, RefObject } from "react";
import { createSafeContext } from "../../primitives";

export type MenuItemContextValue = {
  menuEvents: FloatingEvents;
  closeOnSelect: boolean;
  activeIndex: number | null;
  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  typingRef: RefObject<boolean>;
};

export const [MenuItemContext, useMenuItem] = createSafeContext<MenuItemContextValue>({
  name: "MenuItemContext",
});
