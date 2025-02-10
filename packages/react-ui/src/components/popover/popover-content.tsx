import { FloatingFocusManager } from "@floating-ui/react";
import type { CSSProperties } from "react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { usePopperAria } from "../popper/popper-aria-context";
import { usePopperTransition } from "../popper/popper-transtion-context";
import { Portal } from "../portal/portal";
import { usePopover } from "./popover-context";

export const PopoverContent = (props: PrimitiveProps<"div">) => {
  const { children, className, style, ...rest } = props;

  const { context, setFloating, getFloatingProps, floatingStyles, initialFocus, finalFocus } = usePopover();
  const { status, mounted, duration } = usePopperTransition();

  const { labelId, descriptionId } = usePopperAria();

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <FloatingFocusManager context={context} initialFocus={initialFocus} returnFocus={finalFocus}>
        <div
          ref={setFloating}
          style={
            {
              ...floatingStyles,
              ...style,
              "--dv": `${duration}ms`,
            } as CSSProperties
          }
          className={tx(
            "border-bd-normal relative z-30 rounded-md border shadow-md outline-none",
            "duration-(--dv) transition-opacity",
            status == "open" ? "opacity-100" : "opacity-0",
            !className?.split(" ").some((cls) => cls.startsWith("bg-")) && "bg-bg-normal",
            className,
          )}
          {...getFloatingProps({
            ...rest,
            "aria-labelledby": labelId,
            "aria-describedby": descriptionId,
            tabIndex: -1,
          })}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </Portal>
  );
};
