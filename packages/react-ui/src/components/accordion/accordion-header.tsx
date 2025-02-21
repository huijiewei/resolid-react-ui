import { Polymorphic, type PolymorphicProps } from "../../primitives";
import { tx } from "../../utils";

export const AccordionHeader = (props: PolymorphicProps<"h3">) => {
  const { render, className, children, ...rest } = props;

  return (
    <Polymorphic<"h3"> as={"h3"} render={render} className={tx("", className)} {...rest}>
      {children}
    </Polymorphic>
  );
};
