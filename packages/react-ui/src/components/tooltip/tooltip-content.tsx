import { useMergeRefs } from "../../hooks";
import type { PrimitiveProps } from "../../primitives";
import { PopperFloating } from "../../primitives/popper/popper-floating";
import { usePopperPositioner } from "../../primitives/popper/popper-positioner-context";
import { usePopperTransition } from "../../primitives/popper/popper-transtion-context";
import { tx } from "../../utils";
import { PortalLite } from "../portal/portal-lite";
import { useTooltip } from "./tooltip-context";

export const TooltipContent = (props: PrimitiveProps<"div">) => {
  const { children, className, style, ref, ...rest } = props;

  const { interactive, contentClassName } = useTooltip();
  const { status, mounted, duration } = usePopperTransition();
  const { positionerStyles, setPositioner } = usePopperPositioner();

  const refs = useMergeRefs(ref, setPositioner);

  if (!mounted) {
    return null;
  }

  return (
    <PortalLite>
      <PopperFloating
        ref={refs}
        style={{ ...style, ...positionerStyles }}
        duration={duration}
        className={tx(
          "z-90 text-fg-emphasized inline-block max-w-96 border px-2 py-1 text-sm shadow-sm transition-opacity",
          status == "open" ? "opacity-100" : "opacity-0",
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
