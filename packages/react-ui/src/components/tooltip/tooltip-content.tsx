import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { PopperFloating } from "../popper/popper-floating";
import { usePopperTransition } from "../popper/popper-transtion-context";
import { PortalLite } from "../portal/portal-lite";
import { useTooltip } from "./tooltip-context";

export const TooltipContent = (props: PrimitiveProps<"div">) => {
  const { children, className, ...rest } = props;

  const { interactive, contentClassName } = useTooltip();
  const { status, mounted, duration } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  return (
    <PortalLite>
      <PopperFloating
        status={status}
        duration={duration}
        className={tx(
          "z-90 text-fg-emphasized inline-block max-w-96 border px-2 py-1 text-sm shadow-sm",
          !interactive && "pointer-events-none",
          contentClassName,
          className,
        )}
        {...rest}
      >
        {children}
      </PopperFloating>
    </PortalLite>
  );
};
