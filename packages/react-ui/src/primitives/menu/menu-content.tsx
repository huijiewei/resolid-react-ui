import { FloatingFocusManager, FloatingList } from "@floating-ui/react";
import { Portal } from "../../components/portal/portal";
import { useMergeRefs } from "../../hooks";
import { tx } from "../../utils";
import type { PrimitiveProps } from "../index";
import { PopperFloating } from "../popper/popper-floating";
import { usePopperPositioner } from "../popper/popper-positioner-context";
import { usePopperTransition } from "../popper/popper-transtion-context";
import { useMenu } from "./menu-context";
import { useMenuHover } from "./menu-hover-context";
import { MenuItemContext, type MenuItemContextValue } from "./menu-item-context";

export const MenuContent = (props: PrimitiveProps<"div">) => {
  const { children, className, style, ref, ...rest } = props;

  const { context, menuEvents, closeOnSelect, activeIndex, getItemProps, nested, elementsRef, labelsRef, typingRef } =
    useMenu();

  const { setHoverEnabled } = useMenuHover();
  const { status, mounted, duration } = usePopperTransition();
  const { setPositioner, positionerStyles } = usePopperPositioner();

  const refs = useMergeRefs(ref, setPositioner);

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
          ref={refs}
          style={{ ...style, ...positionerStyles }}
          duration={duration}
          onMouseEnter={handleMouseEnter}
          className={tx(
            "border-bd-normal bg-bg-normal min-w-25 z-30 border p-1 shadow-sm transition-opacity",
            status == "open" ? "opacity-100" : "opacity-0",
            className,
          )}
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
