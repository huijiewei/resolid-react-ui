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
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { type PropsWithChildren, type ReactNode, useRef } from "react";
import { useDisclosure } from "../../hooks";
import { PopperArrowContext, type PopperArrowContextValue } from "../popper/popper-arrow-context";
import { PopperReferenceContext, type PopperReferenceContextValue } from "../popper/popper-reference-context";
import { TooltipFloatingContext, type TooltipFloatingContextValue } from "./tooltip-context";
import { tooltipArrowStyles, tooltipFloatingStyles, type TooltipStyleProps } from "./tooltip.styles";

export type TooltipRootProps = {
  /**
   * 触发模式
   * @default 'hover'
   */
  trigger?: "click" | "hover";

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
   * 动画持续时间
   * @default '250'
   */
  duration?: number;

  /**
   * @ignore
   */
  children?: ReactNode | ((props: { opened: boolean }) => ReactNode);
};

export const TooltipRoot = (props: PropsWithChildren<TooltipRootProps>) => {
  const { children, trigger = "hover", duration = 250, placement = "auto", color = "neutral" } = props;

  const [openedState, { open, close }] = useDisclosure();

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
    open: openedState,
    onOpenChange: (opened) => {
      if (opened) {
        open();
      } else {
        close();
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
    useHover(context, { enabled: trigger == "hover" }),
    useFocus(context, { enabled: trigger == "hover" }),
    useClick(context, { enabled: trigger == "click" }),
    useRole(context, { role: "tooltip" }),
    useDismiss(context),
  ]);

  const referenceContext: PopperReferenceContextValue = {
    opened: openedState,
    setReference: refs.setReference,
    setPositionReference: refs.setPositionReference,
    getReferenceProps,
  };

  const floatingContext: TooltipFloatingContextValue = {
    duration,
    context,
    floatingStyles,
    setFloating: refs.setFloating,
    getFloatingProps,
    floatingClassName: tooltipFloatingStyles({ color }),
  };

  return (
    <PopperArrowContext value={arrowContext}>
      <PopperReferenceContext value={referenceContext}>
        <TooltipFloatingContext value={floatingContext}>
          {typeof children == "function" ? children({ opened: openedState }) : children}
        </TooltipFloatingContext>
      </PopperReferenceContext>
    </PopperArrowContext>
  );
};
