import type { EmptyObject, PrimitiveProps } from "../../primitives";
import { useOrientation } from "../../primitives/composite/orientation-context";
import { Indicator } from "../../primitives/indicator/indicator";

export const TabsIndicator = (props: PrimitiveProps<"span", EmptyObject, "role" | "children">) => {
  const orientation = useOrientation();

  return <Indicator orientation={orientation} {...props} />;
};
