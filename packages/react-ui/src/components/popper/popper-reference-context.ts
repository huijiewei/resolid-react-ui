import type { ReferenceType } from "@floating-ui/react";
import type { HTMLProps } from "react";
import { createSafeContext } from "../../primitives";

export type PopperReferenceContextValue = {
  opened: boolean;
  setReference: (node: ReferenceType | null) => void;
  setPositionReference: (node: ReferenceType | null) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => Record<string, unknown>;
};

export const [PopperReferenceContext, usePopperReference] = createSafeContext<PopperReferenceContextValue>({
  strict: true,
  name: "PopperReferenceContext",
});
