import type { Dispatch, SetStateAction } from "react";
import { createSafeContext } from "../../primitives";

export type ColorMode = "system" | "light" | "dark";

export const [ColorModeStateContext, useColorModeState] = createSafeContext<ColorMode>({
  name: "ColorModeStateContext",
  strict: true,
});

export const [ColorModeDispatchContext, useColorModeDispatch] = createSafeContext<Dispatch<SetStateAction<ColorMode>>>({
  name: "ColorModeDispatchContext",
  strict: true,
});
