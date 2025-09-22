import type { Dispatch, SetStateAction } from "react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ColorMode = "auto" | "light" | "dark";

const colorModeDesc = createSafeContext<ColorMode>({
  name: "ColorModeStateContext",
});

export const ColorModeStateContext: SafeContext<ColorMode> = colorModeDesc[0];
export const useColorModeState: UseSafeContext<ColorMode> = colorModeDesc[1];

const colorModeDispatchDesc = createSafeContext<Dispatch<SetStateAction<ColorMode>>>({
  name: "ColorModeDispatchContext",
});

export const ColorModeDispatchContext: SafeContext<Dispatch<SetStateAction<ColorMode>>> = colorModeDispatchDesc[0];
export const useColorModeDispatch: UseSafeContext<Dispatch<SetStateAction<ColorMode>>> = colorModeDispatchDesc[1];
