import { createSafeContext } from "../index";

export type PopperAriaContextValue = {
  labelId: string;
  descriptionId: string;
};

export const [PopperAriaContext, usePopperAria] = createSafeContext<PopperAriaContextValue>({
  name: "PopperAriaContext",
});
