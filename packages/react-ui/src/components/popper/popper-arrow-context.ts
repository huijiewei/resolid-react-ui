import type { FloatingContext } from "@floating-ui/react";
import type { RefObject } from "react";
import { createSafeContext } from "../../primitives";

export type PopperArrowContextValue = {
  context: FloatingContext;
  setArrow: RefObject<SVGSVGElement | null>;
  arrowClassName?: string;
};

export const [PopperArrowContext, usePopperArrow] = createSafeContext<PopperArrowContextValue>({
  name: "PopperArrowContext",
});
