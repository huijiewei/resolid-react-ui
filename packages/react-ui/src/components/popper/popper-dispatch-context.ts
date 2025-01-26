import { createSafeContext } from "../../primitives";

export type PopperDispatchContextValue = {
  handleOpen?: () => void;
  handleClose: () => void;
};

export const [PopperDispatchContext, usePopperDispatch] = createSafeContext<PopperDispatchContextValue>({
  strict: true,
  name: "PopperDispatchContext",
});
