import type { ElementType } from "react";
import { PopperTrigger, type PopperTriggerProps } from "../popper/popper-trigger";

export const DialogTrigger = <T extends ElementType = "button">(props: Omit<PopperTriggerProps<T>, "active">) => {
  return <PopperTrigger active={false} {...props} />;
};
