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
import { type PropsWithChildren, useId, useRef } from "react";
import { useDisclosure } from "../../hooks";
import { PopperAriaContext } from "../popper/popper-aria-context";
import { PopperArrowContext, type PopperArrowContextValue } from "../popper/popper-arrow-context";
import type { PopperDisclosureProps } from "../popper/popper-disclosure";
import { PopperDispatchContext, type PopperDispatchContextValue } from "../popper/popper-dispatch-context";
import { PopperReferenceContext, type PopperReferenceContextValue } from "../popper/popper-reference-context";
import { PopperTransitionContext, type PopperTransitionContextValue } from "../popper/popper-transtion-context";
import { type PopoverBaseProps, PopoverContext, type PopoverContextValue } from "./popover-context";

export type PopoverRootProps = PopperDisclosureProps &
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

  const popoverContext: PopoverContextValue = {
    context,
    initialFocus,
    finalFocus,
    setFloating: refs.setFloating,
    getFloatingProps,
    floatingStyles,
  };

  const dispatchContext: PopperDispatchContextValue = {
    handleOpen,
    handleClose,
  };

  const { isMounted, status } = useTransitionStatus(context, {
    duration: duration,
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
              <PopperTransitionContext value={transitionContext}>{children}</PopperTransitionContext>
            </PopperDispatchContext>
          </PopoverContext>
        </PopperReferenceContext>
      </PopperArrowContext>
    </PopperAriaContext>
  );
};
