import { FloatingFocusManager } from "@floating-ui/react";
import type { PrimitiveProps } from "../../primitives";
import { usePopperAria } from "../../primitives/popper/popper-aria-context";
import { PopperFloating } from "../../primitives/popper/popper-floating";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { tx } from "../../utils";
import { useDialog } from "../dialog/dialog-context";
import { useDrawer } from "./drawer-context";

const placementStyles = {
  start: {
    base: "start-0 top-0 bottom-0",
    open: "translate-x-none",
    close: "-translate-x-full",
  },
  end: {
    base: "end-0 top-0 bottom-0",
    open: "translate-x-none",
    close: "translate-x-full",
  },
  top: {
    base: "top-0 left-0 right-0",
    open: "translate-y-none",
    close: "-translate-y-full",
  },
  bottom: {
    base: "bottom-0 left-0 right-0",
    open: "translate-y-none",
    close: "translate-y-full",
  },
};

export const DrawerContent = (props: PrimitiveProps<"div">) => {
  const { children, className, ...rest } = props;

  const { placement } = useDrawer();
  const { labelId, descriptionId } = usePopperAria();
  const { context, initialFocus, finalFocus } = useDialog();
  const { status, mounted, duration } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  const drawerStyle = placementStyles[placement];

  return (
    <div className={"z-55 fixed left-0 top-0 flex h-screen w-screen justify-center"}>
      <FloatingFocusManager context={context} initialFocus={initialFocus} returnFocus={finalFocus}>
        <PopperFloating
          duration={duration}
          className={tx(
            "fixed flex flex-col shadow-md transition-[opacity,translate]",
            drawerStyle.base,
            !className?.split(" ").some((cls) => cls.startsWith("bg-")) && "bg-bg-normal",
            status == "open" ? ["opacity-100", drawerStyle.open] : ["opacity-0", drawerStyle.close],
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
