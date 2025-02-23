import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  type Placement,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStatus,
} from "@floating-ui/react";
import { type PropsWithChildren, useState } from "react";
import { useDisclosure, type UseDisclosureOptions } from "../../hooks";
import { PopperAnchorContext, type PopperAnchorContextValue } from "../../primitives/popper/popper-anchor-context";
import { PopperArrowContext, type PopperArrowContextValue } from "../../primitives/popper/popper-arrow-context";
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
import { TooltipContext, type TooltipContextValue } from "./tooltip-context";
import { tooltipColorStyles } from "./tooltip.styles";

export type TooltipRootProps = UseDisclosureOptions & {
  /**
   * 颜色
   * @default "neutral"
   */
  color?: keyof typeof tooltipColorStyles;

  /**
   * 放置位置
   * @default "auto"
   */
  placement?: "auto" | Placement;

  /**
   * 打开延迟
   * @default 300
   */
  openDelay?: number;

  /**
   * 关闭延迟
   * @default 150
   */
  closeDelay?: number;

  /**
   * 内容是否是交互。在此模式下，当用户将鼠标悬停在内容上时，工具提示将保持打开状态
   * @default false
   */
  interactive?: boolean;

  /**
   * 动画持续时间
   * @default 250
   */
  duration?: number;
};

export const TooltipRoot = (props: PropsWithChildren<TooltipRootProps>) => {
  const {
    open,
    defaultOpen = false,
    onOpenChange,
    color = "neutral",
    placement = "auto",
    interactive = false,
    openDelay = 300,
    closeDelay = 150,
    duration = 250,
    children,
  } = props;

  const [openState, { handleOpen, handleClose }] = useDisclosure({ open, defaultOpen, onOpenChange });

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

  const tooltipColorStyle = tooltipColorStyles[color];

  const arrowContext: PopperArrowContextValue = {
    context,
    setArrow: setArrowElem,
    arrowClassName: tooltipColorStyle.arrow,
  };

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useRole(context, { role: "tooltip" }),
    useHover(context, {
      mouseOnly: true,
      move: false,
      delay: { open: openDelay, close: closeDelay },
      handleClose: interactive ? safePolygon() : null,
    }),
    useFocus(context),
    useDismiss(context, { referencePress: true }),
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

  const tooltipContext: TooltipContextValue = {
    interactive,
    contentClassName: tooltipColorStyle.content,
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
    <PopperArrowContext value={arrowContext}>
      <PopperStateContext value={stateContext}>
        <PopperTriggerContext value={referenceContext}>
          <PopperAnchorContext value={anchorContext}>
            <TooltipContext value={tooltipContext}>
              <PopperTransitionContext value={transitionContext}>
                <PopperPositionerContext value={positionerContext}>
                  <PopperFloatingContext value={floatingContext}>{children}</PopperFloatingContext>
                </PopperPositionerContext>
              </PopperTransitionContext>
            </TooltipContext>
          </PopperAnchorContext>
        </PopperTriggerContext>
      </PopperStateContext>
    </PopperArrowContext>
  );
};
