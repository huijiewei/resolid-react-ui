import type { ComponentProps } from "react";
import { PopperBackdrop } from "../../primitives/popper/popper-backdrop";
import { PopperClose } from "../../primitives/popper/popper-close";
import { PopperDescription } from "../../primitives/popper/popper-description";
import { PopperPortal } from "../../primitives/popper/popper-portal";
import { PopperTitle } from "../../primitives/popper/popper-title";
import { PopperTrigger } from "../../primitives/popper/popper-trigger";
import { DialogRoot, type DialogRootProps } from "./dialog-root";

export type DialogProps = DialogRootProps;

export const Dialog = DialogRoot;

export const DialogTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">) => {
  return <PopperTrigger active={false} {...props} />;
};

export const DialogPortal = PopperPortal;

export const DialogBackdrop = PopperBackdrop;

export { DialogContent } from "./dialog-content";

export const DialogTitle = PopperTitle;
export const DialogDescription = PopperDescription;

export const DialogClose = PopperClose;
