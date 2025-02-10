import { FloatingFocusManager } from "@floating-ui/react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { usePopperAria } from "../popper/popper-aria-context";
import { PopperFloating } from "../popper/popper-floating";
import { usePopperTransition } from "../popper/popper-transtion-context";
import { Portal } from "../portal/portal";
import { usePopover } from "./popover-context";

export const PopoverContent = (props: PrimitiveProps<"div">) => {
  const { children, className, ...rest } = props;

  const { context, initialFocus, finalFocus } = usePopover();
  const { status, mounted, duration } = usePopperTransition();

  const { labelId, descriptionId } = usePopperAria();

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <FloatingFocusManager context={context} initialFocus={initialFocus} returnFocus={finalFocus}>
        <PopperFloating
          status={status}
          duration={duration}
          className={tx(
            "border-bd-normal relative z-30 border shadow-md",
            !className?.split(" ").some((cls) => cls.startsWith("bg-")) && "bg-bg-normal",
            className,
          )}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          {...rest}
        >
          {children}
        </PopperFloating>
      </FloatingFocusManager>
    </Portal>
  );
};
