import type { ReferenceType } from "@floating-ui/react";
import type { HTMLProps } from "react";
import { type AnyObject, createSafeContext } from "../index";

export type PopperTriggerContextValue = {
  open: boolean;
  setReference: (node: ReferenceType | null) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => AnyObject;
  setPositionReference: (node: ReferenceType | null) => void;
};

export const [PopperTriggerContext, usePopperTrigger] = createSafeContext<PopperTriggerContextValue>({
  name: "PopperTriggerContext",
});
