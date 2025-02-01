import { FloatingFocusManager, FloatingList, useTransitionStatus } from "@floating-ui/react";
import type { CSSProperties } from "react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { Portal } from "../portal/portal";
import { useMenuFloating } from "./menu-floating-context";
import { useMenuHover } from "./menu-hover-context";
import { MenuItemContext, type MenuItemContextValue } from "./menu-item-context";

export const MenuContent = (props: PrimitiveProps<"div">) => {
  const { children, className, ...rest } = props;

  const {
    context,
    setFloating,
    getFloatingProps,
    floatingStyles,
    menuEvents,
    closeOnSelect,
    activeIndex,
    getItemProps,
    nested,
    duration,
    elementsRef,
    labelsRef,
    typingRef,
  } = useMenuFloating();

  const menuItemContext: MenuItemContextValue = {
    menuEvents,
    closeOnSelect,
    activeIndex,
    getItemProps,
    typingRef,
  };

  const { setHoverEnabled } = useMenuHover();

  const { isMounted, status } = useTransitionStatus(context, {
    duration: duration,
  });

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <FloatingFocusManager context={context} modal={false}>
        <div
          ref={setFloating}
          style={{ ...floatingStyles, "--dv": `${duration}ms` } as CSSProperties}
          className={tx(
            "border-bd-normal bg-bg-normal min-w-25 z-30 rounded-md border p-1 shadow-sm outline-none",
            "duration-(--dv) transition-opacity",
            status == "open" ? "opacity-100" : "opacity-0",
            className,
          )}
          {...getFloatingProps({
            ...rest,
            onMouseEnter: () => {
              if (nested) {
                setHoverEnabled(false);
              }
            },
          })}
        >
          <MenuItemContext value={menuItemContext}>
            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
              {children}
            </FloatingList>
          </MenuItemContext>
        </div>
      </FloatingFocusManager>
    </Portal>
  );
};
