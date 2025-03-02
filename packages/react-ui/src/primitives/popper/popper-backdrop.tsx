import type { CSSProperties } from "react";
import { hasBackgroundClass } from "../../shared/utils";
import { tx } from "../../utils";
import type { PrimitiveProps } from "../index";
import { usePopperTransition } from "./popper-transtion-context";

export const PopperBackdrop = (props: PrimitiveProps<"div">) => {
  const { className, children, style, ...rest } = props;

  const { status, mounted, duration } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{ ...style, "--dv": `${duration}ms` } as CSSProperties}
      className={tx(
        "fixed inset-0 z-50 overflow-auto",
        "duration-(--dv) transition-opacity",
        status == "open" ? "opacity-50" : "opacity-0",
        !hasBackgroundClass(className) && "bg-black",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
