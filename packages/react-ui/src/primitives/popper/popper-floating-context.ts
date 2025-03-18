import type { HTMLProps } from "react";
import { type AnyObject, createSafeContext } from "../index";

export type PopperFloatingContextValue = {
  floating?: HTMLElement | null;
  setFloating?: (node: HTMLElement | null) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
};

export const [PopperFloatingContext, usePopperFloating] = createSafeContext<PopperFloatingContextValue>({
  name: "PopperFloatingContext",
});
