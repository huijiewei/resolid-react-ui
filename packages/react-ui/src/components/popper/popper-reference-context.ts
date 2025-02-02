import type { ReferenceType } from "@floating-ui/react";
import type { HTMLProps } from "react";
import { createSafeContext } from "../../primitives";

export type PopperReferenceContextValue = {
  open: boolean;
  setReference: (node: ReferenceType | null) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Record<string, unknown>;
  setPositionReference: (node: ReferenceType | null) => void;
};

export const [PopperReferenceContext, usePopperReference] = createSafeContext<PopperReferenceContextValue>({
  name: "PopperReferenceContext",
});
