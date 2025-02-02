import { createSafeContext } from "../../primitives";

export type PopperAriaContextValue = {
  labelId: string;
  descriptionId: string;
};

export const [PopperAriaContext, usePopperAria] = createSafeContext<PopperAriaContextValue>({
  name: "PopperAriaContext",
});
