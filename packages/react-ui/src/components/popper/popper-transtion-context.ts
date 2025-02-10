import { createSafeContext } from "../../primitives";

export type PopperTransitionStatus = "unmounted" | "initial" | "open" | "close";

export type PopperTransitionContextValue = {
  status: PopperTransitionStatus;
  mounted: boolean;
  duration: number;
};

export const [PopperTransitionContext, usePopperTransition] = createSafeContext<PopperTransitionContextValue>({
  name: "PopperTransitionContext",
});
