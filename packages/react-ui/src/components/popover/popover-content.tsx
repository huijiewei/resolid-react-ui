import { FloatingFocusManager } from "@floating-ui/react";
import type { PrimitiveProps } from "../../primitives";
import { usePopperAria } from "../../primitives/popper/popper-aria-context";
import { PopperFloating } from "../../primitives/popper/popper-floating";
import { PopperPositioner } from "../../primitives/popper/popper-positioner";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { tx } from "../../utils";
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
      <PopperPositioner>
        <FloatingFocusManager context={context} initialFocus={initialFocus} returnFocus={finalFocus}>
          <PopperFloating
            status={status}
            duration={duration}
            className={tx(
              "border-bd-normal relative border shadow-md",
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
      </PopperPositioner>
    </Portal>
  );
};
