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

export const Toast = ToastRoot;

export const ToastContent = AlertContent;

export const ToastTitle = (props: PrimitiveProps<"div", EmptyObject, "id">) => {
  const { labelId } = usePopperAria();

  return <AlertTitle id={labelId} {...props} />;
};

export const ToastDescription = (props: PrimitiveProps<"div", EmptyObject, "id">) => {
  const { descriptionId } = usePopperAria();

  return <AlertDescription id={descriptionId} {...props} />;
};

export const ToastIndicator = AlertIndicator;

export const ToastCloseButton = (props: PrimitiveProps<"button", AlertCloseButtonProps, "type" | "color">) => {
  const { handleClose } = usePopperDispatch();

  return <AlertCloseButton onClick={handleClose} {...props} />;
};
