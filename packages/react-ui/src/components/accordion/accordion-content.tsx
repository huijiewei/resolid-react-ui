import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { CollapsibleContent } from "../collapsible/collapsible-content";

export const AccordionContent = (props: PrimitiveProps<"div", EmptyObject, "id" | "role">) => {
  return <CollapsibleContent role={"region"} {...props} />;
};
