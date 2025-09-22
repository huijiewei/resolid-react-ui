import { createSafeContext, type SafeContext, type UseSafeContext } from "../index";

export type PopperAriaContextValue = {
  labelId: string;
  descriptionId: string;
};

const dest = createSafeContext<PopperAriaContextValue>({
  name: "PopperAriaContext",
});

export const PopperAriaContext: SafeContext<PopperAriaContextValue> = dest[0];
export const usePopperAria: UseSafeContext<PopperAriaContextValue> = dest[1];
