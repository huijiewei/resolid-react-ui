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
  useTypeahead,
} from "@floating-ui/react";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { useDisclosure } from "../../hooks";
import { PopperArrowContext, type PopperArrowContextValue } from "../popper/popper-arrow-context";
import type { PopperDisclosureProps } from "../popper/popper-disclosure";
import { PopperDispatchContext, type PopperDispatchContextValue } from "../popper/popper-dispatch-context";
import { PopperReferenceContext, type PopperReferenceContextValue } from "../popper/popper-reference-context";
import { MenuFloatingContext, type MenuFloatingContextValue } from "./menu-floating-context";
import { MenuHoverContext } from "./menu-hover-context";

export type MenuRootProps = PopperDisclosureProps & {
  /**
   * 选择项目后, 菜单将关闭
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * 放置位置
   * @default 'bottom-start'
   */
  placement?: Placement;

  /**
   * 动画持续时间
   * @default '250'
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
    placement = "bottom-start",
    duration = 250,
    children,
  } = props;

  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const nested = parentId != null;

  const [openState, { handleOpen, handleClose }] = useDisclosure({ open, defaultOpen, onOpenChange });

  const arrowRef = useRef<SVGSVGElement>(null);

  const { floatingStyles, refs, context } = useFloating({
    middleware: [
      offset({ mainAxis: nested ? 0 : 8, alignmentAxis: nested ? -5 : 0 }),
      flip(),
      shift({ padding: 8 }),
      // eslint-disable-next-line react-compiler/react-compiler
      arrow({
        element: arrowRef,
        padding: 4,
      }),
    ].filter(Boolean),
    open: openState,
    onOpenChange: (open) => {
      if (open) {
        handleOpen();
      } else {
        handleClose();
      }
    },
    nodeId,
    placement: nested ? "right-start" : placement,
    whileElementsMounted: autoUpdate,
  });

  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const labelsRef = useRef<(string | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const typingRef = useRef(false);

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
      disabledIndices: [],
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

  const floatingContext: MenuFloatingContextValue = {
    context,
    floatingStyles,
    setFloating: refs.setFloating,
    getFloatingProps,
    menuEvents,
    closeOnSelect,
    activeIndex,
    getItemProps,
    nested,
    duration,
    elementsRef,
    labelsRef,
    typingRef,
  };

  const arrowContext: PopperArrowContextValue = {
    context,
    setArrow: arrowRef,
    arrowClassName: "fill-bg-normal [&>path:first-of-type]:stroke-bg-muted",
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

  return (
    <PopperArrowContext value={arrowContext}>
      <PopperReferenceContext value={referenceContext}>
        <MenuFloatingContext value={floatingContext}>
          <PopperDispatchContext value={dispatchContext}>
            <MenuHoverContext value={{ setHoverEnabled }}>
              <FloatingNode id={nodeId}>{children}</FloatingNode>
            </MenuHoverContext>
          </PopperDispatchContext>
        </MenuFloatingContext>
      </PopperReferenceContext>
    </PopperArrowContext>
  );
};
