import type { Dispatch, SetStateAction } from "react";
import { createSafeContext } from "../../primitives";

export type MenuHoverContextValue = { setHoverEnabled: Dispatch<SetStateAction<boolean>> };

export const [MenuHoverContext, useMenuHover] = createSafeContext<MenuHoverContextValue>({
  strict: true,
  name: "MenuHoverContext",
});
