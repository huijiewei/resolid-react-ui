import { createSafeContext } from "../context";

export type PopperStateContextValue = {
  open: boolean;
};

export const [PopperStateContext, usePopperState] = createSafeContext<PopperStateContextValue>({
  name: "PopperStateContext",
});
