import { FloatingFocusManager } from "@floating-ui/react";
import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { usePopperAria } from "../../primitives/popper/popper-aria-context";
import { PopperFloating } from "../../primitives/popper/popper-floating";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { getPopperAnimationProps } from "../../primitives/popper/utils";
import { hasBackgroundClass } from "../../shared/utils";
import { tx } from "../../utils";
import { useDialog } from "./dialog-context";

export const DialogContent = (props: PrimitiveProps<"div">): JSX.Element | null => {
  const { children, className, style, ...rest } = props;

  const { context, initialFocus, finalFocus, scrollBehavior, placement } = useDialog();
  const { status, mounted, duration } = usePopperTransition();

  const { labelId, descriptionId } = usePopperAria();

  if (!mounted) {
    return null;
  }

  const animationProps = getPopperAnimationProps({ status, duration });

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
          style={{ ...style, ...animationProps.style }}
          className={tx(
            "relative mx-auto shadow-md",
            animationProps.className,
            scrollBehavior == "inside" && "max-h-[calc(100%-10rem)]",
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
    </div>
  );
};
