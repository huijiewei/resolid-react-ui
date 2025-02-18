import { createSafeContext } from "../index";

export type PopperDispatchContextValue = {
  handleOpen?: () => void;
  handleClose: () => void;
};

export const [PopperDispatchContext, usePopperDispatch] = createSafeContext<PopperDispatchContextValue>({
  name: "PopperDispatchContext",
});
