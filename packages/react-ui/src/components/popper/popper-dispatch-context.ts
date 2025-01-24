import { createSafeContext } from "../../primitives";

export type PopperDispatchContextValue = {
  open?: () => void;
  close: () => void;
};

export const [PopperDispatchContext, usePopperDispatch] = createSafeContext<PopperDispatchContextValue>({
  strict: true,
  name: "PopperDispatchContext",
});
