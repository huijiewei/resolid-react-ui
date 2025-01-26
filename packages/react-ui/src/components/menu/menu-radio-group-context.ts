import { createSafeContext } from "../../primitives";

export type MenuRadioGroupContextValue = {
  value?: string | number;
  onChange?: (value: string | number) => void;
};

export const [MenuRadioGroupContext, useMenuRadioGroup] = createSafeContext<MenuRadioGroupContextValue>({
  strict: true,
  name: "MenuRadioGroupContext",
});
