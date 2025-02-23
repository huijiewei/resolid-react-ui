import type { ReferenceType } from "@floating-ui/react";
import { createSafeContext } from "../context";

export type PopperAnchorContextValue = {
  setPositionReference: (node: ReferenceType | null) => void;
};

export const [PopperAnchorContext, usePopperAnchor] = createSafeContext<PopperAnchorContextValue>({
  name: "PopperAnchorContext",
});
