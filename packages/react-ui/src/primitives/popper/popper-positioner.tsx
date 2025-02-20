import type { EmptyObject, PrimitiveProps } from "../polymorphic";
import { usePopperPositioner } from "./popper-positioner-context";

export const PopperPositioner = (props: PrimitiveProps<"div", EmptyObject, "role" | "ref">) => {
  const { className, style, children, ...rest } = props;

  const { positionerStyles, setPositioner } = usePopperPositioner();

  return (
    <div
      ref={setPositioner}
      role={"presentation"}
      style={{ ...positionerStyles, ...style }}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
};
