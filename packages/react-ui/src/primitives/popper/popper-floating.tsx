import type { CSSProperties } from "react";
import { useMergeRefs } from "../../hooks";
import { tx } from "../../utils";
import type { PrimitiveProps } from "../index";
import { usePopperFloating } from "./popper-floating-context";
import type { PopperTransitionStatus } from "./popper-transtion-context";

export type PopperFloatingProps = {
  status: PopperTransitionStatus;
  duration: number;
};

export const PopperFloating = (props: PrimitiveProps<"div", PopperFloatingProps>) => {
  const { className, children, style, status, duration, ref, ...rest } = props;

  const { setFloating, getFloatingProps } = usePopperFloating();

  const refs = useMergeRefs(ref, setFloating);

  return (
    <div
      ref={refs}
      style={
        {
          ...style,
          "--dv": `${duration}ms`,
        } as CSSProperties
      }
      className={tx(
        "duration-(--dv) rounded-md outline-none transition-opacity",
        status == "open" ? "opacity-100" : "opacity-0",
        className,
      )}
      {...getFloatingProps({
        ...rest,
      })}
    >
      {children}
    </div>
  );
};
