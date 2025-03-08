import { useMergeRefs } from "../../hooks";
import { tx } from "../../utils";
import type { EmptyObject, PrimitiveProps } from "../index";
import { usePopperFloating } from "./popper-floating-context";

export const PopperFloating = (props: PrimitiveProps<"div", EmptyObject>) => {
  const { className, children, ref, ...rest } = props;

  const { setFloating, getFloatingProps } = usePopperFloating();

  const refs = useMergeRefs(ref, setFloating);

  return (
    <div ref={refs} className={tx("rounded-md outline-none", className)} {...getFloatingProps(rest)}>
      {children}
    </div>
  );
};
