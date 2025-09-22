import type { ReferenceType } from "@floating-ui/react";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type PopperAnchorContextValue = {
  setPositionReference: (node: ReferenceType | null) => void;
};

const dest = createSafeContext<PopperAnchorContextValue>({
  name: "PopperAnchorContext",
});

export const PopperAnchorContext: SafeContext<PopperAnchorContextValue> = dest[0];
export const usePopperAnchor: UseSafeContext<PopperAnchorContextValue> = dest[1];
