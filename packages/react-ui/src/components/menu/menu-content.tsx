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
  } = useMenuFloating();

  const menuItemContext: MenuItemContextValue = {
    menuEvents,
    closeOnSelect,
    activeIndex,
    getItemProps,
  };

  const { setHoverEnabled } = useMenuHover();

  const { isMounted, status } = useTransitionStatus(context, {
    duration: duration,
  });

  return (
    <>
      {isMounted && (
        <Portal>
          <FloatingFocusManager context={context} modal={false} initialFocus={nested ? -1 : 0}>
            <div
              className={tx(
                "border-bd-normal bg-bg-normal z-30 min-w-32 rounded-md border p-1 shadow-sm outline-none",
                "duration-(--duration-var) transition-opacity",
                status == "open" ? "opacity-100" : "opacity-0",
                className,
              )}
              ref={setFloating}
              style={{ ...floatingStyles, "--duration-var": `${duration}ms` } as CSSProperties}
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
      )}
    </>
  );
};
