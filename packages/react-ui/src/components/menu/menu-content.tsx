import { FloatingFocusManager, FloatingList } from "@floating-ui/react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { PopperFloating } from "../popper/popper-floating";
import { usePopperTransition } from "../popper/popper-transtion-context";
import { Portal } from "../portal/portal";
import { useMenu } from "./menu-context";
import { useMenuHover } from "./menu-hover-context";
import { MenuItemContext, type MenuItemContextValue } from "./menu-item-context";

export const MenuContent = (props: PrimitiveProps<"div">) => {
  const { children, className, ...rest } = props;

  const { context, menuEvents, closeOnSelect, activeIndex, getItemProps, nested, elementsRef, labelsRef, typingRef } =
    useMenu();

  const { setHoverEnabled } = useMenuHover();
  const { status, mounted, duration } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  const menuItemContext: MenuItemContextValue = {
    menuEvents,
    closeOnSelect,
    activeIndex,
    getItemProps,
    typingRef,
  };

  const handleMouseEnter = () => {
    if (nested) {
      setHoverEnabled(false);
    }
  };

  return (
    <Portal>
      <FloatingFocusManager context={context} modal={false}>
        <PopperFloating
          status={status}
          duration={duration}
          onMouseEnter={handleMouseEnter}
          className={tx("border-bd-normal bg-bg-normal min-w-25 z-30 border p-1 shadow-sm", className)}
          {...rest}
        >
          <MenuItemContext value={menuItemContext}>
            <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
              {children}
            </FloatingList>
          </MenuItemContext>
        </PopperFloating>
      </FloatingFocusManager>
    </Portal>
  );
};
