import type { Dispatch, SetStateAction } from "react";
import {
  useColorModeDispatch as useColorModeContextDispatch,
  useColorModeState as useColorModeContextState,
  type ColorMode,
} from "./color-mode-context";

export type { ColorMode } from "./color-mode-context";

export const useColorModeState = (): ColorMode => useColorModeContextState(false);

export const useColorModeDispatch = (): Dispatch<SetStateAction<ColorMode>> => useColorModeContextDispatch(false);
