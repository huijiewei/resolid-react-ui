import type { PropsWithChildren } from "react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode-provider";

export type ResolidProviderProps = {
  colorMode?: ColorModeProviderProps;
};

export const ResolidProvider = ({ children, colorMode }: PropsWithChildren<ResolidProviderProps>) => {
  return <ColorModeProvider {...colorMode}>{children}</ColorModeProvider>;
};
