import type { FloatingEvents } from "@floating-ui/react";
import type { HTMLProps } from "react";
import { createSafeContext } from "../../primitives";

export type MenuItemContextValue = {
  menuEvents: FloatingEvents;
  closeOnSelect: boolean;
  activeIndex: number | null;
  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
};

export const [MenuItemContext, useMenuItem] = createSafeContext<MenuItemContextValue>({
  strict: true,
  name: "MenuItemContext",
});
