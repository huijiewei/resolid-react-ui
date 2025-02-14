import type { ElementType } from "react";
import type { PolymorphicProps } from "../../primitives";
import { ariaAttr } from "../../utils";
import { useCollapsibleTrigger } from "./collapsible-context";

export const CollapsibleTrigger = <T extends ElementType = "button">(props: PolymorphicProps<T>) => {
  const { as: Component = "button", children, ...rest } = props;

  const { id, open, disabled, toggle } = useCollapsibleTrigger();

  return (
    <Component
      disabled={disabled}
      aria-disabled={ariaAttr(disabled)}
      aria-expanded={ariaAttr(open)}
      aria-controls={id}
      type={Component == "button" ? "button" : undefined}
      onClick={() => {
        toggle();
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};
