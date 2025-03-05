import type { Orientation } from "../../shared/types";
import { createSafeContext } from "../context";

export const [OrientationContext, useOrientation] = createSafeContext<Orientation>({
  name: "OrientationContext",
});
