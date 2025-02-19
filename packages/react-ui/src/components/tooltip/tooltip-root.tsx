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
import { PopperArrowContext, type PopperArrowContextValue } from "../../primitives/popper/popper-arrow-context";
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
import { TooltipContext, type TooltipContextValue } from "./tooltip-context";
import { tooltipArrowStyles, tooltipContentStyles, type TooltipStyleProps } from "./tooltip.styles";

export type TooltipRootProps = UseDisclosureOptions & {
  /**
   * 颜色
   * @default "neutral"
   */
  color?: TooltipStyleProps["color"];

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
   * @default 100
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
    closeDelay = 100,
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

  const arrowContext: PopperArrowContextValue = {
    context,
    setArrow: setArrowElem,
    arrowClassName: tooltipArrowStyles({ color }),
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

  const tooltipContext: TooltipContextValue = {
    interactive,
    contentClassName: tooltipContentStyles({ color }),
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
    <PopperArrowContext value={arrowContext}>
      <PopperReferenceContext value={referenceContext}>
        <TooltipContext value={tooltipContext}>
          <PopperTransitionContext value={transitionContext}>
            <PopperFloatingContext value={floatingContext}>{children}</PopperFloatingContext>
          </PopperTransitionContext>
        </TooltipContext>
      </PopperReferenceContext>
    </PopperArrowContext>
  );
};
