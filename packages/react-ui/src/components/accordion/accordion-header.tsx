import { Polymorphic, type PolymorphicProps } from "../../primitives";

export const AccordionHeader = (props: PolymorphicProps<"h3">) => {
  const { render, ...rest } = props;

  return <Polymorphic<"h3"> as={"h3"} render={render} {...rest} />;
};
