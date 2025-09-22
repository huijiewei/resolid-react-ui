import type { FloatingEvents } from "@floating-ui/react";
import type { HTMLProps, RefObject } from "react";
import { type AnyObject, createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type MenuItemContextValue = {
  menuEvents: FloatingEvents;
  closeOnSelect: boolean;
  activeIndex: number | null;
  getItemProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
  typingRef: RefObject<boolean>;
};

const dest = createSafeContext<MenuItemContextValue>({
  name: "MenuItemContext",
});

export const MenuItemContext: SafeContext<MenuItemContextValue> = dest[0];
export const useMenuItem: UseSafeContext<MenuItemContextValue> = dest[1];
