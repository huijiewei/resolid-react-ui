import { type MouseEvent, type PointerEvent, useCallback, useEffect, useRef } from "react";
import { Polymorphic, type PolymorphicProps } from "../../primitives";
import { usePopperDispatch } from "../../primitives/popper/popper-dispatch-context";
import { usePopperTrigger } from "../../primitives/popper/popper-trigger-context";
import { dataAttr } from "../../utils";

type ContextMenuTriggerProps = {
  /**
   * 是否被禁用
   * @default false
   */
  disabled?: boolean;
};

export const ContextMenuTrigger = (props: PolymorphicProps<"div", ContextMenuTriggerProps>) => {
  const {
    render,
    disabled = false,
    onContextMenu,
    onPointerDown,
    onPointerMove,
    onPointerCancel,
    onPointerUp,
    children,
    ...rest
  } = props;

  const { open, setPositionReference } = usePopperTrigger();
  const { handleOpen } = usePopperDispatch();

  const longPressTimerRef = useRef(0);

  const clearLongPress = useCallback(() => window.clearTimeout(longPressTimerRef.current), []);

  useEffect(() => clearLongPress, [clearLongPress]);
  useEffect(() => void (disabled && clearLongPress()), [disabled, clearLongPress]);

  const openMenu = (e: MouseEvent | PointerEvent) => {
    setPositionReference({
      getBoundingClientRect() {
        return {
          height: 0,
          width: 0,
          x: e.clientX,
          y: e.clientY,
          top: e.clientY,
          right: e.clientX,
          bottom: e.clientY,
          left: e.clientX,
        };
      },
    });

    handleOpen?.();
  };

  const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    onContextMenu?.(e);

    if (!disabled) {
      clearLongPress();
      openMenu(e);
      e.preventDefault();
    }
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    onPointerDown?.(e);

    if (!disabled && e.pointerType != "mouse") {
      clearLongPress();
      longPressTimerRef.current = window.setTimeout(() => openMenu(e), 700);
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);

    if (!disabled && e.pointerType != "mouse") {
      clearLongPress();
    }
  };

  const handlePointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    onPointerCancel?.(e);

    if (!disabled && e.pointerType != "mouse") {
      clearLongPress();
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    onPointerUp?.(e);

    if (!disabled && e.pointerType != "mouse") {
      clearLongPress();
    }
  };

  return (
    <Polymorphic<"div">
      as={"div"}
      render={render}
      data-active={dataAttr(open)}
      onContextMenu={handleContextMenu}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerCancel={handlePointerCancel}
      onPointerUp={handlePointerUp}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
};
