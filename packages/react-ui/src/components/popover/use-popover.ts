import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  inline,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
  type Placement,
  type ReferenceType,
} from "@floating-ui/react";
import { useId, useState, type RefObject } from "react";
import { useDisclosure } from "../../hooks";
import type { PopperAnchorContextValue } from "../../primitives/popper/popper-anchor-context";
import type { PopperArrowContextValue } from "../../primitives/popper/popper-arrow-context";
import type { PopperDispatchContextValue } from "../../primitives/popper/popper-dispatch-context";
import type { PopperFloatingContextValue } from "../../primitives/popper/popper-floating-context";
import type { PopperPositionerContextValue } from "../../primitives/popper/popper-positioner-context";
import type { PopperStateContextValue } from "../../primitives/popper/popper-state-context";
import type { PopperTransitionContextValue } from "../../primitives/popper/popper-transtion-context";
import type { PopperTriggerContextValue } from "../../primitives/popper/popper-trigger-context";
import type { DisclosureProps } from "../../shared/types";
import type { PopoverBaseProps, PopoverRootContextValue } from "./popover-root-context";

export type PopoverProps = DisclosureProps &
  PopoverBaseProps & {
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
     * 放置位置
     * @default "auto"
     */
    placement?: "auto" | Placement;

    /**
     * 控制是否启用 inline 中间件
     * @default false
     */
    inlineMiddleware?: boolean;
  };

export const usePopover = ({
  open,
  defaultOpen,
  onOpenChange,
  initialFocus,
  finalFocus,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  placement = "auto",
  duration = 250,
  inlineMiddleware = false,
}: PopoverProps = {}): {
  setOpen: (open: boolean) => void;
  setPositionReference: (node: ReferenceType | null) => void;
  floatingReference: RefObject<HTMLElement | null>;
  ariaContext: {
    labelId: string;
    descriptionId: string;
  };
  arrowContext: PopperArrowContextValue;
  stateContext: PopperStateContextValue;
  transitionContext: PopperTransitionContextValue;
  popoverRootContext: PopoverRootContextValue;
  dispatchContext: PopperDispatchContextValue;
  floatingContext: PopperFloatingContextValue;
  referenceContext: PopperTriggerContextValue;
  positionerContext: PopperPositionerContextValue;
  anchorContext: PopperAnchorContextValue;
} => {
  const [openState, { handleOpen, handleClose }] = useDisclosure({ open, defaultOpen, onOpenChange });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const ariaContext = {
    labelId,
    descriptionId,
  };

  const handleOpenChange = (open: boolean): void => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  const [arrowElem, setArrowElem] = useState<SVGSVGElement | null>(null);

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      inlineMiddleware && inline(),
      offset(8),
      placement == "auto" ? autoPlacement() : flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowElem,
        padding: 4,
      }),
    ],
    open: openState,
    onOpenChange: handleOpenChange,
    placement: placement == "auto" ? undefined : placement,
    whileElementsMounted: autoUpdate,
  });

  const arrowContext: PopperArrowContextValue = {
    context,
    setArrow: setArrowElem,
    arrowClassName: "fill-bg-normal [&>path:first-of-type]:stroke-bd-normal",
  };

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useRole(context),
    useClick(context, {
      event: "mousedown",
    }),
    useDismiss(context, {
      outsidePressEvent: "mousedown",
      escapeKey: closeOnEscape,
      outsidePress: closeOnOutsideClick,
    }),
  ]);

  const stateContext: PopperStateContextValue = {
    open: openState,
  };

  const referenceContext: PopperTriggerContextValue = {
    setReference: refs.setReference,
    getReferenceProps,
  };

  const anchorContext: PopperAnchorContextValue = {
    setPositionReference: refs.setPositionReference,
  };

  const floatingContext: PopperFloatingContextValue = {
    getFloatingProps,
  };

  const popoverRootContext: PopoverRootContextValue = {
    context,
    initialFocus,
    finalFocus,
  };

  const dispatchContext: PopperDispatchContextValue = {
    handleOpen,
    handleClose,
  };

  const { isMounted, status } = useTransitionStatus(context, {
    duration,
  });

  const transitionContext: PopperTransitionContextValue = {
    status,
    mounted: isMounted,
    duration,
  };

  const positionerContext: PopperPositionerContextValue = {
    setPositioner: refs.setFloating,
    positionerStyles: floatingStyles,
  };

  return {
    setOpen: handleOpenChange,
    setPositionReference: refs.setPositionReference,
    floatingReference: refs.floating,
    ariaContext,
    arrowContext,
    stateContext,
    transitionContext,
    popoverRootContext,
    dispatchContext,
    floatingContext,
    referenceContext,
    positionerContext,
    anchorContext,
  };
};
