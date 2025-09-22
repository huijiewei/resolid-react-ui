import type { Dispatch, SetStateAction } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type MenuHoverContextValue = { setHoverEnabled: Dispatch<SetStateAction<boolean>> };

const dest = createSafeContext<MenuHoverContextValue>({
  name: "MenuHoverContext",
});

export const MenuHoverContext: SafeContext<MenuHoverContextValue> = dest[0];
export const useMenuHover: UseSafeContext<MenuHoverContextValue> = dest[1];
