import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  type Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
} from "@floating-ui/react";
import { type PropsWithChildren, useId, useState } from "react";
import { useDisclosure, type UseDisclosureOptions } from "../../hooks";
import { PopperAriaContext } from "../../primitives/popper/popper-aria-context";
import { PopperArrowContext, type PopperArrowContextValue } from "../../primitives/popper/popper-arrow-context";
import {
  PopperDispatchContext,
  type PopperDispatchContextValue,
} from "../../primitives/popper/popper-dispatch-context";
import {
  PopperFloatingContext,
  type PopperFloatingContextValue,
} from "../../primitives/popper/popper-floating-context";
import {
  PopperReferenceContext,
  type PopperReferenceContextValue,
} from "../../primitives/popper/popper-reference-context";
import {
  PopperTransitionContext,
  type PopperTransitionContextValue,
} from "../../primitives/popper/popper-transtion-context";
import { type PopoverBaseProps, PopoverContext, type PopoverContextValue } from "./popover-context";

export type PopoverRootProps = UseDisclosureOptions &
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
     * 动画持续时间
     * @default 250
     */
    duration?: number;
  };

export const PopoverRoot = (props: PropsWithChildren<PopoverRootProps>) => {
  const {
    open,
    defaultOpen,
    onOpenChange,
    initialFocus,
    finalFocus,
    closeOnEscape = true,
    closeOnOutsideClick = true,
    placement = "auto",
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

  const [arrowElem, setArrowElem] = useState<SVGSVGElement | null>(null);

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      offset(8),
      placement == "auto" ? autoPlacement() : flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowElem,
        padding: 4,
      }),
    ],
    open: openState,
    onOpenChange: (open) => {
      if (open) {
        handleOpen();
      } else {
        handleClose();
      }
    },
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

  const referenceContext: PopperReferenceContextValue = {
    open: openState,
    setReference: refs.setReference,
    getReferenceProps,
    setPositionReference: refs.setPositionReference,
  };

  const floatingContext: PopperFloatingContextValue = {
    setFloating: refs.setFloating,
    getFloatingProps,
    floatingStyles,
  };

  const popoverContext: PopoverContextValue = {
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

  return (
    <PopperAriaContext value={ariaContext}>
      <PopperArrowContext value={arrowContext}>
        <PopperReferenceContext value={referenceContext}>
          <PopoverContext value={popoverContext}>
            <PopperDispatchContext value={dispatchContext}>
              <PopperTransitionContext value={transitionContext}>
                <PopperFloatingContext value={floatingContext}>{children}</PopperFloatingContext>
              </PopperTransitionContext>
            </PopperDispatchContext>
          </PopoverContext>
        </PopperReferenceContext>
      </PopperArrowContext>
    </PopperAriaContext>
  );
};
