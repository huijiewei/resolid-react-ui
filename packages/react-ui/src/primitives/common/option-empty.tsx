import type { JSX } from "react";
import { tx } from "../../utils";
import type { PrimitiveProps } from "../polymorphic";
import { useOptionEmpty } from "./option-empty-context";

export const OptionEmpty = ({ className, children, ...rest }: PrimitiveProps<"div">): JSX.Element | null => {
  const isEmpty = useOptionEmpty();

  if (isEmpty) {
    return (
      <div className={tx("text-fg-subtlest py-2 text-center text-sm", className)} {...rest}>
        {children ?? "没有选项"}
      </div>
    );
  }

  return null;
};
