import type { ReferenceType } from "@floating-ui/react";
import type { HTMLProps } from "react";
import { type AnyObject, createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperTriggerContextValue = {
  setReference: (node: ReferenceType | null) => void;
  getReferenceProps: (userProps?: HTMLProps<Element> | undefined) => AnyObject;
};

const desc = createSafeContext<PopperTriggerContextValue>({
  name: "PopperTriggerContext",
});

export const PopperTriggerContext: SafeContext<PopperTriggerContextValue> = desc[0];
export const usePopperTrigger: UseSafeContext<PopperTriggerContextValue> = desc[1];
