import type { JSX } from "react/jsx-runtime";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export const InputAffix = (props: PrimitiveProps<"div">): JSX.Element => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={tx(
        "text-fg-subtlest pointer-events-none absolute inset-y-0 flex items-center justify-center",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
