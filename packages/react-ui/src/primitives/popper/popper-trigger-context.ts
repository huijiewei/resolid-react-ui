import type { ReferenceType } from "@floating-ui/react";
import type { HTMLProps } from "react";
import { type AnyObject, createSafeContext } from "../index";

export type PopperTriggerContextValue = {
  setReference: (node: ReferenceType | null) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => AnyObject;
};

export const [PopperTriggerContext, usePopperTrigger] = createSafeContext<PopperTriggerContextValue>({
  name: "PopperTriggerContext",
});
