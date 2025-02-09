import {
  useClick,
  useDismiss,
  useFloatingRootContext,
  useInteractions,
  useRole,
  useTransitionStatus,
  type FloatingContext,
} from "@floating-ui/react";
import { useId, useState, type PropsWithChildren } from "react";
import { useDisclosure, usePreventScroll } from "../../hooks";
import { PopperAriaContext } from "../popper/popper-aria-context";
import type { PopperDisclosureProps } from "../popper/popper-disclosure";
import { PopperDispatchContext, type PopperDispatchContextValue } from "../popper/popper-dispatch-context";
import { PopperReferenceContext, type PopperReferenceContextValue } from "../popper/popper-reference-context";
import { PopperTransitionContext, type PopperTransitionContextValue } from "../popper/popper-transtion-context";
import { DialogContext, type DialogBaseProps, type DialogContextValue } from "./dialog-context";

export type DialogRootProps = PopperDisclosureProps &
  DialogBaseProps & {
    /**
     * 按下 Esc 键时关闭
     * @default true
     */
    closeOnEscape?: boolean;

    /**
     * 单击外部时关闭
     * @default true
     */
    closeOnOutsideClick?: boolean;

    /**
     * 打开时阻止背景页面滚动
     * @default false
     */
    preventScroll?: boolean;

    /**
     * 动画持续时间
     * @default 250
     */
    duration?: number;

    /**
     * 对话框角色
     * @default "dialog"
     */
    role?: "dialog" | "alertdialog";
  };

export const DialogRoot = (props: PropsWithChildren<DialogRootProps>) => {
  const {
    open,
    defaultOpen,
    onOpenChange,
    initialFocus,
    finalFocus,
    scrollBehavior = "inside",
    role = "dialog",
    closeOnEscape = true,
    closeOnOutsideClick = role == "dialog",
    preventScroll = true,
    placement = "top",
    duration = 250,
    children,
  } = props;

  const [openState, { handleOpen, handleClose }] = useDisclosure({ open, defaultOpen, onOpenChange });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const ariaContext = {
    labelId,
    descriptionId,
  };

  const [reference, setReference] = useState<HTMLElement | null>(null);
  const [floating, setFloating] = useState<HTMLElement | null>(null);

  const context = useFloatingRootContext({
    elements: { reference, floating },
    open: openState,
    onOpenChange: (open) => {
      if (open) {
        handleOpen();
      } else {
        handleClose();
      }
    },
  });

  usePreventScroll({
    enabled: preventScroll && openState,
    contentElement: context.elements.reference as HTMLElement,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useRole(context, { role }),
    useClick(context),
    useDismiss(context, { escapeKey: closeOnEscape, outsidePress: closeOnOutsideClick }),
  ]);

  const dialogContext: DialogContextValue = {
    context,
    initialFocus,
    finalFocus,
    scrollBehavior,
    placement,
    setFloating,
    getFloatingProps,
  };

  const dispatchContext: PopperDispatchContextValue = {
    handleOpen,
    handleClose,
  };

  const referenceContext: PopperReferenceContextValue = {
    open: openState,
    setReference: (node) => {
      setReference(node as HTMLElement);
    },
    getReferenceProps,
    setPositionReference: () => {},
  };

  const { isMounted, status } = useTransitionStatus(context as FloatingContext, {
    duration: duration,
  });

  const transtionContext: PopperTransitionContextValue = {
    status,
    mounted: isMounted,
    duration,
  };

  return (
    <PopperAriaContext value={ariaContext}>
      <PopperReferenceContext value={referenceContext}>
        <DialogContext value={dialogContext}>
          <PopperDispatchContext value={dispatchContext}>
            <PopperTransitionContext value={transtionContext}>{children}</PopperTransitionContext>
          </PopperDispatchContext>
        </DialogContext>
      </PopperReferenceContext>
    </PopperAriaContext>
  );
};
