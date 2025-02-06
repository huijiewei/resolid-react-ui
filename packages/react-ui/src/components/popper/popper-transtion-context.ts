import { createSafeContext } from "../../primitives";

export type PopperTransitionContextValue = {
  status: "unmounted" | "initial" | "open" | "close";
  mounted: boolean;
  duration: number;
};

export const [PopperTransitionContext, usePopperTransition] = createSafeContext<PopperTransitionContextValue>({
  name: "PopperTransitionContext",
});
