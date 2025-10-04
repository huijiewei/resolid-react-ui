import { createSafeContext, type SafeContext, type UseSafeContext } from "../../primitives";

export type ComboboxPopupContextValue = {
  duration: number;
  setFloating: (node: HTMLElement) => void;
};

const desc = createSafeContext<ComboboxPopupContextValue>({
  name: "ComboboxRootContext",
});

export const ComboboxPopupContext: SafeContext<ComboboxPopupContextValue> = desc[0];
export const useComboboxPopup: UseSafeContext<ComboboxPopupContextValue> = desc[1];
