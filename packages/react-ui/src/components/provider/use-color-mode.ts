import {
  useColorModeDispatch as useColorModeContextDispatch,
  useColorModeState as useColorModeContextState,
} from "./color-mode-context";

export type { ColorMode } from "./color-mode-context";

export const useColorModeState = () => useColorModeContextState(false);

export const useColorModeDispatch = () => useColorModeContextDispatch(false);
