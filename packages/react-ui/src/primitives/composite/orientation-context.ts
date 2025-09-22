import type { Orientation } from "../../shared/types";
import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

const dest = createSafeContext<Orientation>({
  name: "OrientationContext",
});

export const OrientationContext: SafeContext<Orientation> = dest[0];
export const useOrientation: UseSafeContext<Orientation> = dest[1];
