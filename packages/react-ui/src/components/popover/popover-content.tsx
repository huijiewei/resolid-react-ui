import { FloatingFocusManager } from "@floating-ui/react";
import type { PrimitiveProps } from "../../primitives";
import { usePopperAria } from "../../primitives/popper/popper-aria-context";
import { PopperFloating } from "../../primitives/popper/popper-floating";
import { PopperPositioner } from "../../primitives/popper/popper-positioner";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { hasBackgroundClass } from "../../shared/utils";
import { tx } from "../../utils";
import { Portal } from "../portal/portal";
import { usePopoverRoot } from "./popover-root-context";

export const PopoverContent = (props: PrimitiveProps<"div">) => {
  const { children, className, ...rest } = props;

  const { context, initialFocus, finalFocus } = usePopoverRoot();
  const { status, mounted, duration } = usePopperTransition();

  const { labelId, descriptionId } = usePopperAria();

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <PopperPositioner>
        <FloatingFocusManager context={context} initialFocus={initialFocus} returnFocus={finalFocus}>
          <PopperFloating
            duration={duration}
            className={tx(
              "border-bd-normal relative border shadow-md transition-opacity",
              status == "open" ? "opacity-100" : "opacity-0",
              !hasBackgroundClass(className) && "bg-bg-normal",
              className,
            )}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            {...rest}
          >
            {children}
          </PopperFloating>
        </FloatingFocusManager>
      </PopperPositioner>
    </Portal>
  );
};
