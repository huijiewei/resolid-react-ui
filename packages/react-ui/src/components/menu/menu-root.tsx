import {
  arrow,
  autoUpdate,
  flip,
  FloatingNode,
  FloatingTree,
  offset,
  type Placement,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStatus,
  useTypeahead,
} from "@floating-ui/react";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { useDisclosure, usePreventScroll } from "../../hooks";
import { PopperArrowContext, type PopperArrowContextValue } from "../popper/popper-arrow-context";
import type { PopperDisclosureProps } from "../popper/popper-disclosure";
import { PopperDispatchContext, type PopperDispatchContextValue } from "../popper/popper-dispatch-context";
import { PopperFloatingContext, type PopperFloatingContextValue } from "../popper/popper-floating-context";
import { PopperReferenceContext, type PopperReferenceContextValue } from "../popper/popper-reference-context";
import { PopperTransitionContext, type PopperTransitionContextValue } from "../popper/popper-transtion-context";
import { MenuContext, type MenuContextValue } from "./menu-context";
import { MenuHoverContext } from "./menu-hover-context";

export type MenuRootProps = PopperDisclosureProps & {
  /**
   * 选择项目后, 菜单将关闭
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * 打开时阻止背景页面滚动
   * @default false
   */
  preventScroll?: boolean;

  /**
   * 放置位置
   * @default "bottom-start"
   */
  placement?: Placement;

  /**
   * 动画持续时间
   * @default 250
   */
  duration?: number;
};

export const MenuRoot = (props: PropsWithChildren<MenuRootProps>) => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return (
      <FloatingTree>
        <MenuTree {...props} />
      </FloatingTree>
    );
  }

  return <MenuTree {...props} />;
};

const MenuTree = (props: PropsWithChildren<MenuRootProps>) => {
  const {
    open,
    defaultOpen = false,
    onOpenChange,
    closeOnSelect = true,
    preventScroll = false,
    placement = "bottom-start",
    duration = 250,
    children,
  } = props;

  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const nested = parentId != null;

  const [openState, { handleOpen, handleClose }] = useDisclosure({ open, defaultOpen, onOpenChange });

  const [arrowElem, setArrowElem] = useState<SVGSVGElement | null>(null);

  const { floatingStyles, refs, context } = useFloating({
    open: openState,
    onOpenChange: (open) => {
      if (open) {
        handleOpen();
      } else {
        handleClose();
      }
    },
    nodeId,
    middleware: [
      offset({ mainAxis: nested ? 0 : 8, alignmentAxis: nested ? -5 : 0 }),
      flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowElem,
        padding: 4,
      }),
    ],
    placement: nested ? "right-start" : placement,
    whileElementsMounted: autoUpdate,
  });

  const arrowContext: PopperArrowContextValue = {
    context,
    setArrow: setArrowElem,
    arrowClassName: "fill-bg-normal [&>path:first-of-type]:stroke-bg-muted",
  };

  usePreventScroll({
    enabled: preventScroll && openState && !nested,
    contentElement: context.elements.reference as HTMLElement,
  });

  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const labelsRef = useRef<(string | null)[]>([]);
  const typingRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverEnabled, setHoverEnabled] = useState(true);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useRole(context, { role: "menu" }),
    useHover(context, {
      enabled: hoverEnabled && nested,
      mouseOnly: true,
      move: false,
      handleClose: safePolygon({ blockPointerEvents: true }),
    }),
    useClick(context, {
      event: "mousedown",
      toggle: !nested,
      ignoreMouse: nested,
    }),
    useDismiss(context, { outsidePressEvent: "mousedown", bubbles: true }),
    useListNavigation(context, {
      listRef: elementsRef,
      nested,
      activeIndex,
      onNavigate: setActiveIndex,
    }),
    useTypeahead(context, {
      listRef: labelsRef,
      activeIndex,
      resetMs: 500,
      onMatch: (index) => {
        if (openState && index !== activeIndex) {
          setActiveIndex(index);
        }
      },
      onTypingChange: (nextTyping) => {
        typingRef.current = nextTyping;
      },
    }),
  ]);

  const referenceContext: PopperReferenceContextValue = {
    open: openState,
    setReference: refs.setReference,
    getReferenceProps,
    setPositionReference: refs.setPositionReference,
  };

  const { events: menuEvents } = useFloatingTree()!;

  const floatingContext: PopperFloatingContextValue = {
    setFloating: refs.setFloating,
    getFloatingProps,
    floatingStyles,
  };

  const menuContext: MenuContextValue = {
    context,
    menuEvents,
    closeOnSelect,
    activeIndex,
    getItemProps,
    nested,
    elementsRef,
    labelsRef,
    typingRef,
  };

  const dispatchContext: PopperDispatchContextValue = {
    handleOpen,
    handleClose,
  };

  useEffect(() => {
    menuEvents.on("close", handleClose);

    return () => {
      menuEvents.off("close", handleClose);
    };
  }, [menuEvents, handleClose]);

  useEffect(() => {
    const handleMenuOpen = (event: { nodeId: string; parentId: string }) => {
      if (event.nodeId != nodeId && event.parentId == parentId) {
        handleClose();
      }
    };

    menuEvents.on("menuopen", handleMenuOpen);

    return () => {
      menuEvents.off("menuopen", handleMenuOpen);
    };
  }, [menuEvents, nodeId, parentId, handleClose]);

  useEffect(() => {
    if (openState) {
      menuEvents.emit("menuopen", { parentId, nodeId });
    }
  }, [menuEvents, nodeId, parentId, openState]);

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
        <MenuContext value={menuContext}>
          <PopperDispatchContext value={dispatchContext}>
            <PopperTransitionContext value={transitionContext}>
              <PopperFloatingContext value={floatingContext}>
                <MenuHoverContext value={{ setHoverEnabled }}>
                  <FloatingNode id={nodeId}>{children}</FloatingNode>
                </MenuHoverContext>
              </PopperFloatingContext>
            </PopperTransitionContext>
          </PopperDispatchContext>
        </MenuContext>
      </PopperReferenceContext>
    </PopperArrowContext>
  );
};
