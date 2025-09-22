import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

export type PopperStateContextValue = {
  open: boolean;
};

const dest = createSafeContext<PopperStateContextValue>({
  name: "PopperStateContext",
});

export const PopperStateContext: SafeContext<PopperStateContextValue> = dest[0];
export const usePopperState: UseSafeContext<PopperStateContextValue> = dest[1];
