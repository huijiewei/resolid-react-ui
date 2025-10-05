import { createSafeContext, type SafeContext, type UseSafeContext } from "../context";

const desc = createSafeContext<boolean>({
  name: "OptionEmptyContext",
});

export const OptionEmptyContext: SafeContext<boolean> = desc[0];
export const useOptionEmpty: UseSafeContext<boolean> = desc[1];
