import type { CSSProperties } from "react";
import { createSafeContext } from "../context";

export type PopperPositionerContextValue = {
  setPositioner: (node: HTMLElement | null) => void;
  positionerStyles: CSSProperties;
};

export const [PopperPositionerContext, usePopperPositioner] = createSafeContext<PopperPositionerContextValue>({
  name: "PopperPositionerContext",
});
