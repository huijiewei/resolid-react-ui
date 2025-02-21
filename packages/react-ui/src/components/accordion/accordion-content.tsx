import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { tx } from "../../utils";
import { CollapsibleContent } from "../collapsible/collapsible-content";

export const AccordionContent = (props: PrimitiveProps<"div", EmptyObject, "id" | "role">) => {
  const { className, children, ...rest } = props;

  return (
    <CollapsibleContent role={"region"} className={tx("", className)} {...rest}>
      {children}
    </CollapsibleContent>
  );
};
