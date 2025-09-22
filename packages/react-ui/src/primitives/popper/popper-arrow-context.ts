import type { FloatingContext } from "@floating-ui/react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperArrowContextValue = {
  context: FloatingContext;
  setArrow: (node: SVGSVGElement) => void;
  arrowClassName?: string;
};

const dest = createSafeContext<PopperArrowContextValue>({
  name: "PopperArrowContext",
});

export const PopperArrowContext: SafeContext<PopperArrowContextValue> = dest[0];
export const usePopperArrow: UseSafeContext<PopperArrowContextValue> = dest[1];
