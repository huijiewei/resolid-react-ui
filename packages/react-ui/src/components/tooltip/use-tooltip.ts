import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  inline,
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
import { useState } from "react";
import { useDisclosure, type UseDisclosureOptions } from "../../hooks";
import type { PopperAnchorContextValue } from "../../primitives/popper/popper-anchor-context";
import type { PopperArrowContextValue } from "../../primitives/popper/popper-arrow-context";
import type { PopperFloatingContextValue } from "../../primitives/popper/popper-floating-context";
import type { PopperPositionerContextValue } from "../../primitives/popper/popper-positioner-context";
import type { PopperStateContextValue } from "../../primitives/popper/popper-state-context";
import type { PopperTransitionContextValue } from "../../primitives/popper/popper-transtion-context";
import type { PopperTriggerContextValue } from "../../primitives/popper/popper-trigger-context";
import type { TooltipRootContextValue } from "./tooltip-root-context";
import { tooltipColorStyles } from "./tooltip.styles";

export type TooltipProps = UseDisclosureOptions & {
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

export const useTooltip = ({
  open,
  defaultOpen = false,
  onOpenChange,
  color = "neutral",
  placement = "auto",
  interactive = false,
  openDelay = 300,
  closeDelay = 150,
  duration = 250,
}: TooltipProps = {}) => {
  const [openState, { handleOpen, handleClose }] = useDisclosure({ open, defaultOpen, onOpenChange });

  const [arrowElem, setArrowElem] = useState<SVGSVGElement | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      inline(),
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

  const tooltipRootContext: TooltipRootContextValue = {
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

  return {
    setOpen: handleOpenChange,
    setPositionReference: refs.setPositionReference,
    floatingReference: refs.floating,
    stateContext,
    arrowContext,
    anchorContext,
    referenceContext,
    positionerContext,
    floatingContext,
    transitionContext,
    tooltipRootContext,
  };
};
