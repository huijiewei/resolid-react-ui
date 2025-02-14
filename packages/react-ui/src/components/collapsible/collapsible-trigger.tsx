import { type EmptyObject, type HtmlProps, Polymorphic, type PolymorphicProps } from "../../primitives";
import { ariaAttr } from "../../utils";
import { useCollapsibleTrigger } from "./collapsible-context";

type CollapsibleTriggerHtmlProps = HtmlProps<"button">;

export const CollapsibleTrigger = (props: PolymorphicProps<CollapsibleTriggerHtmlProps, EmptyObject, "type">) => {
  const { render, children, ...rest } = props;

  const { id, open, disabled, toggle } = useCollapsibleTrigger();

  return (
    <Polymorphic<CollapsibleTriggerHtmlProps>
      as={"button"}
      render={render}
      disabled={disabled}
      aria-disabled={ariaAttr(disabled)}
      aria-expanded={ariaAttr(open)}
      aria-controls={id}
      type={render ? undefined : "button"}
      onClick={() => {
        toggle();
      }}
      {...rest}
    >
      {children}
    </Polymorphic>
  );
};
