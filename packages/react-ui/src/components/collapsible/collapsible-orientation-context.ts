import { createSafeContext } from "../../primitives";
import type { Orientation } from "../../shared/types";

export const [CollapsibleOrientationContext, useCollapsibleOrientation] = createSafeContext<Orientation>({
  name: "CollapsibleOrientationContext",
});
