import type { JSX } from "react/jsx-runtime";
import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { usePopperAria } from "../../primitives/popper/popper-aria-context";
import { usePopperDispatch } from "../../primitives/popper/popper-dispatch-context";
import {
  AlertCloseButton,
  type AlertCloseButtonProps,
  AlertContent,
  AlertDescription,
  AlertIndicator,
  AlertTitle,
} from "../alert/alert";
import { ToastRoot, type ToastRootProps } from "./toast-root";

export type ToastProps = ToastRootProps;

export const Toast: typeof ToastRoot = ToastRoot;

export const ToastContent: typeof AlertContent = AlertContent;

export const ToastTitle = (props: PrimitiveProps<"div", EmptyObject, "id">): JSX.Element => {
  const { labelId } = usePopperAria();

  return <AlertTitle id={labelId} {...props} />;
};

export const ToastDescription = (props: PrimitiveProps<"div", EmptyObject, "id">): JSX.Element => {
  const { descriptionId } = usePopperAria();

  return <AlertDescription id={descriptionId} {...props} />;
};

export const ToastIndicator: typeof AlertIndicator = AlertIndicator;

export const ToastCloseButton = (
  props: PrimitiveProps<"button", AlertCloseButtonProps, "type" | "color">,
): JSX.Element => {
  const { handleClose } = usePopperDispatch();

  return <AlertCloseButton onClick={handleClose} {...props} />;
};
