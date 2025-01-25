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
} from "@floating-ui/react";
import { type PropsWithChildren, useRef } from "react";
import { useDisclosure } from "../../hooks";
import { PopperArrowContext, type PopperArrowContextValue } from "../popper/popper-arrow-context";
import { PopperReferenceContext, type PopperReferenceContextValue } from "../popper/popper-reference-context";
import { TooltipFloatingContext, type TooltipFloatingContextValue } from "./tooltip-context";
import { tooltipArrowStyles, tooltipFloatingStyles, type TooltipStyleProps } from "./tooltip.styles";

export type TooltipRootProps = {
  /**
   * 受控打开状态
   */
  open?: boolean;

  /**
   * 初始渲染时的默认打开状态
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * 打开状态改变时调用的事件处理程序
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * 颜色
   * @default 'neutral'
   */
  color?: TooltipStyleProps["color"];

  /**
   * 放置位置
   * @default 'auto'
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

  const arrowRef = useRef<SVGSVGElement>(null);

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      offset(8),
      placement == "auto" ? autoPlacement() : flip(),
      shift({ padding: 8 }),
      // eslint-disable-next-line react-compiler/react-compiler
      arrow({
        element: arrowRef,
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
    setArrow: arrowRef,
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

  const floatingContext: TooltipFloatingContextValue = {
    context,
    duration,
    setFloating: refs.setFloating,
    getFloatingProps,
    floatingStyles,
    floatingClassName: tooltipFloatingStyles({ color }),
  };

  return (
    <PopperArrowContext value={arrowContext}>
      <PopperReferenceContext value={referenceContext}>
        <TooltipFloatingContext value={floatingContext}>{children}</TooltipFloatingContext>
      </PopperReferenceContext>
    </PopperArrowContext>
  );
};
