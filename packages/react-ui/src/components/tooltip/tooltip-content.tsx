import { useTransitionStatus } from "@floating-ui/react";
import type { CSSProperties } from "react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { PortalLite } from "../portal/portal-lite";
import { useTooltipFloating } from "./tooltip-context";

export const TooltipContent = (props: PrimitiveProps<"div">) => {
  const { children, className, ...rest } = props;

  const { context, duration, interactive, floatingStyles, floatingClassName, setFloating, getFloatingProps } =
    useTooltipFloating();

  const { isMounted, status } = useTransitionStatus(context, {
    duration: duration,
  });

  if (!isMounted) {
    return null;
  }

  return (
    <PortalLite>
      <div
        ref={setFloating}
        style={
          {
            ...floatingStyles,
            "--dv": `${duration}ms`,
          } as CSSProperties
        }
        className={tx(
          "z-90 text-fg-emphasized inline-block max-w-96 rounded-md border px-2 py-1 text-sm shadow-sm",
          "duration-(--dv) transition-opacity",
          status == "open" ? "opacity-100" : "opacity-0",
          !interactive && "pointer-events-none",
          floatingClassName,
          className,
        )}
        {...getFloatingProps({
          ...rest,
        })}
      >
        {children}
      </div>
    </PortalLite>
  );
};
