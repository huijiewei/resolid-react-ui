import type { Dispatch, SetStateAction } from "react";
import { createSafeContext } from "../index";

export type MenuHoverContextValue = { setHoverEnabled: Dispatch<SetStateAction<boolean>> };

export const [MenuHoverContext, useMenuHover] = createSafeContext<MenuHoverContextValue>({
  name: "MenuHoverContext",
});
