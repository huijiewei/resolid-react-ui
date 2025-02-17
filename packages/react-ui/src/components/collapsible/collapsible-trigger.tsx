import { useButtonProps } from "../../hooks";
import { type EmptyObject, Polymorphic, type PolymorphicProps } from "../../primitives";
import { ariaAttr } from "../../utils";
import { useCollapsibleTrigger } from "./collapsible-context";

export const CollapsibleTrigger = (props: PolymorphicProps<"button", EmptyObject, "type" | "disabled">) => {
  const { render, tabIndex, children, ...rest } = props;

  const { id, open, disabled, toggle } = useCollapsibleTrigger();

  const buttonProps = useButtonProps({
    hasRender: !!render,
    tabIndex,
    disabled,
  });

  return (
    <Polymorphic<"button">
      as={"button"}
      render={render}
      {...buttonProps}
      aria-expanded={ariaAttr(open)}
      aria-controls={id}
      onClick={() => {
        toggle();
      }}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
};
