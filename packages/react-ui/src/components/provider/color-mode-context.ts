import type { Dispatch, SetStateAction } from "react";
import { createSafeContext } from "../../primitives";

export type ColorMode = "auto" | "light" | "dark";

export const [ColorModeStateContext, useColorModeState] = createSafeContext<ColorMode>({
  name: "ColorModeStateContext",
});

export const [ColorModeDispatchContext, useColorModeDispatch] = createSafeContext<Dispatch<SetStateAction<ColorMode>>>({
  name: "ColorModeDispatchContext",
});
