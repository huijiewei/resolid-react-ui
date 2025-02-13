import type { CSSProperties, HTMLProps } from "react";
import { type AnyObject, createSafeContext } from "../../primitives";

export type PopperFloatingContextValue = {
  setFloating: (node: HTMLElement | null) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
  floatingStyles: CSSProperties;
};

export const [PopperFloatingContext, usePopperFloating] = createSafeContext<PopperFloatingContextValue>({
  name: "PopperFloatingContext",
});
