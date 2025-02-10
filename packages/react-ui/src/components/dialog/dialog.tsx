import type { ElementType } from "react";
import { PopperBackdrop } from "../popper/popper-backdrop";
import { PopperClose } from "../popper/popper-close";
import { PopperDescrition } from "../popper/popper-description";
import { PopperTitle } from "../popper/popper-title";
import { PopperTrigger, type PopperTriggerProps } from "../popper/popper-trigger";
import { DialogRoot, type DialogRootProps } from "./dialog-root";

export type DialogProps = DialogRootProps;

export const Dialog = DialogRoot;

export const DialogTrigger = <T extends ElementType = "button">(props: Omit<PopperTriggerProps<T>, "active">) => {
  return <PopperTrigger active={false} {...props} />;
};

export { DialogPortal } from "./dialog-portal";

export const DialogBackdrop = PopperBackdrop;

export { DialogContent } from "./dialog-content";

export const DialogTitle = PopperTitle;
export const DialogDescription = PopperDescrition;

export const DialogClose = PopperClose;
