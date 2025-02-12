import type { FloatingContext } from "@floating-ui/react";
import { createSafeContext } from "../../primitives";

export type PopperArrowContextValue = {
  context: FloatingContext;
  setArrow: (node: SVGSVGElement) => void;
  arrowClassName?: string;
};

export const [PopperArrowContext, usePopperArrow] = createSafeContext<PopperArrowContextValue>({
  name: "PopperArrowContext",
});
