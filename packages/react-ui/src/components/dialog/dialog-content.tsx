import { FloatingFocusManager } from "@floating-ui/react";
import type { CSSProperties } from "react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { usePopperAria } from "../popper/popper-aria-context";
import { usePopperTransition } from "../popper/popper-transtion-context";
import { useDialog } from "./dialog-context";

export const DialogContent = (props: PrimitiveProps<"div">) => {
  const { children, className, style, ...rest } = props;

  const { context, setFloating, getFloatingProps, initialFocus, finalFocus, scrollBehavior, placement } = useDialog();
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
        <div
          ref={setFloating}
          style={{ ...style, "--dv": `${duration}ms` } as CSSProperties}
          className={tx(
            "relative mx-auto rounded-md shadow-md",
            "duration-(--dv) transition-opacity",
            status == "open" ? "opacity-100" : "opacity-0",
            scrollBehavior == "inside" && "max-h-[calc(100%-10rem)]",
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
    </div>
  );
};
