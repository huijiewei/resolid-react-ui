import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperDispatchContextValue = {
  handleOpen?: () => void;
  handleClose: () => void;
};

const dest = createSafeContext<PopperDispatchContextValue>({
  name: "PopperDispatchContext",
});

export const PopperDispatchContext: SafeContext<PopperDispatchContextValue> = dest[0];
export const usePopperDispatch: UseSafeContext<PopperDispatchContextValue> = dest[1];
