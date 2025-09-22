import type { HTMLProps } from "react";
import { type AnyObject, createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperFloatingContextValue = {
  setFloating?: (node: HTMLElement | null) => void;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => AnyObject;
};

const dest = createSafeContext<PopperFloatingContextValue>({
  name: "PopperFloatingContext",
});

export const PopperFloatingContext: SafeContext<PopperFloatingContextValue> = dest[0];
export const usePopperFloating: UseSafeContext<PopperFloatingContextValue> = dest[1];
