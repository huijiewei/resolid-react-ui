import { FloatingArrow, type FloatingArrowProps } from "@floating-ui/react";
import { tx } from "../../utils";
import { usePopperArrow } from "./popper-arrow-context";

export type PopperArrowProps = Omit<FloatingArrowProps, "context" | "stroke" | "fill">;

export const PopperArrow = (props: PopperArrowProps) => {
  const { className, width = 8, height = 4, tipRadius = 0.1, strokeWidth = 1, ...rest } = props;

  const { context, setArrow, arrowClassName } = usePopperArrow();

  return (
    <FloatingArrow
      ref={setArrow}
      className={tx(arrowClassName, className)}
      strokeWidth={strokeWidth}
      width={width}
      height={height}
      context={context}
      tipRadius={tipRadius}
      {...rest}
    />
  );
};
