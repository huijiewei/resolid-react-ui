import type { JSX } from "react";
import type { PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";

export const Textarea = ({ className, ...rest }: PrimitiveProps<"textarea">): JSX.Element => {
  return (
    <textarea
      className={tx(
        "rounded-md border p-2",
        "border-bd-normal bg-bg-normal rounded-md border p-2 outline-1 outline-transparent transition-colors",
        "focus-within:border-bg-primary-emphasis focus-within:outline-bg-primary-emphasis/70 not-focus-within:hover:border-bd-hovered",
        className,
      )}
      {...rest}
    />
  );
};
