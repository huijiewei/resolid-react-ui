import { FloatingFocusManager } from "@floating-ui/react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { usePopperAria } from "../popper/popper-aria-context";
import { PopperFloating } from "../popper/popper-floating";
import { usePopperTransition } from "../popper/popper-transtion-context";
import { useDialog } from "./dialog-context";

export const DialogContent = (props: PrimitiveProps<"div">) => {
  const { children, className, ...rest } = props;

  const { context, initialFocus, finalFocus, scrollBehavior, placement } = useDialog();
  const { status, mounted, duration } = usePopperTransition();

  const { labelId, descriptionId } = usePopperAria();

  if (!mounted) {
    return null;
  }

  return (
    <div
      role={"presentation"}
      className={tx(
        "fixed left-0 top-0 z-50 flex w-screen justify-center",
        placement == "top" ? "items-start" : placement == "bottom" ? "items-end" : "items-center",
        scrollBehavior == "inside" ? "h-screen" : "h-full overflow-y-auto",
      )}
    >
      <FloatingFocusManager context={context} initialFocus={initialFocus} returnFocus={finalFocus}>
        <PopperFloating
          status={status}
          duration={duration}
          className={tx(
            "relative mx-auto shadow-md",
            scrollBehavior == "inside" && "max-h-[calc(100%-10rem)]",
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
    </div>
  );
};
