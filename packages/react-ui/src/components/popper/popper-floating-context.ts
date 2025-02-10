import type { CSSProperties, HTMLProps } from "react";
import { createSafeContext } from "../../primitives";

export type PopperFloatingContextValue = {
  setFloating: (node: HTMLElement | null) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  floatingStyles: CSSProperties;
};

export const [PopperFloatingContext, usePopperFloating] = createSafeContext<PopperFloatingContextValue>({
  name: "PopperFloatingContext",
});
