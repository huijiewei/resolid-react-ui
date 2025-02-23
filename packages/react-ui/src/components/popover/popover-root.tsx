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
import { PopperAnchorContext, type PopperAnchorContextValue } from "../../primitives/popper/popper-anchor-context";
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
  PopperPositionerContext,
  type PopperPositionerContextValue,
} from "../../primitives/popper/popper-positioner-context";
import { PopperStateContext, type PopperStateContextValue } from "../../primitives/popper/popper-state-context";
import {
  PopperTransitionContext,
  type PopperTransitionContextValue,
} from "../../primitives/popper/popper-transtion-context";
import { PopperTriggerContext, type PopperTriggerContextValue } from "../../primitives/popper/popper-trigger-context";
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

  const stateContext: PopperStateContextValue = {
    open: openState,
  };

  const referenceContext: PopperTriggerContextValue = {
    setReference: refs.setReference,
    getReferenceProps: getReferenceProps,
  };

  const anchorContext: PopperAnchorContextValue = {
    setPositionReference: refs.setPositionReference,
  };

  const floatingContext: PopperFloatingContextValue = {
    getFloatingProps,
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

  const positionerContext: PopperPositionerContextValue = {
    setPositioner: refs.setFloating,
    positionerStyles: floatingStyles,
  };

  return (
    <PopperAriaContext value={ariaContext}>
      <PopperArrowContext value={arrowContext}>
        <PopperStateContext value={stateContext}>
          <PopperTriggerContext value={referenceContext}>
            <PopperAnchorContext value={anchorContext}>
              <PopoverContext value={popoverContext}>
                <PopperDispatchContext value={dispatchContext}>
                  <PopperTransitionContext value={transitionContext}>
                    <PopperPositionerContext value={positionerContext}>
                      <PopperFloatingContext value={floatingContext}>{children}</PopperFloatingContext>
                    </PopperPositionerContext>
                  </PopperTransitionContext>
                </PopperDispatchContext>
              </PopoverContext>
            </PopperAnchorContext>
          </PopperTriggerContext>
        </PopperStateContext>
      </PopperArrowContext>
    </PopperAriaContext>
  );
};
