import type { FloatingContext } from "@floating-ui/react";
import type { CSSProperties, HTMLProps } from "react";

export type PopperFloatingContextValue = {
  context: FloatingContext;
  setFloating: (node: HTMLElement | null) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  floatingStyles: CSSProperties;
};
