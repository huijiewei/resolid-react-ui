import { type MouseEvent, type PointerEvent, type PointerEventHandler, useCallback, useEffect, useRef } from "react";
import type { PolymorphicProps } from "../../primitives";
import { dataAttr } from "../../utils";
import { usePopperDispatch } from "../popper/popper-dispatch-context";
import { usePopperReference } from "../popper/popper-reference-context";

type MenuContextmenuTriggerProps = {
  disabled?: boolean;
};

export const MenuContextmenuTrigger = (props: PolymorphicProps<"div", MenuContextmenuTriggerProps>) => {
  const {
    as: Component = "div",
    disabled = false,
    onContextMenu,
    onPointerDown,
    onPointerMove,
    onPointerCancel,
    onPointerUp,
    children,
    ...rest
  } = props;

  const { setPositionReference, open } = usePopperReference();
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

    if (!disabled) {
      whenTouchOrPen((e) => {
        clearLongPress();
        longPressTimerRef.current = window.setTimeout(() => openMenu(e), 700);
      });
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);

    if (!disabled) {
      whenTouchOrPen(clearLongPress);
    }
  };

  const handlePointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    onPointerCancel?.(e);

    if (!disabled) {
      whenTouchOrPen(clearLongPress);
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    onPointerUp?.(e);

    if (!disabled) {
      whenTouchOrPen(clearLongPress);
    }
  };

  return (
    <Component
      data-active={dataAttr(open)}
      onContextMenu={handleContextMenu}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerCancel={handlePointerCancel}
      onPointerUp={handlePointerUp}
      {...rest}
    >
      {children}
    </Component>
  );
};

const whenTouchOrPen =
  <E extends Element>(handler: PointerEventHandler<E>): PointerEventHandler<E> =>
  (event) =>
    event.pointerType != "mouse" ? handler(event) : undefined;
