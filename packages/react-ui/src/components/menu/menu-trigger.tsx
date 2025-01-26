import type { ElementType } from "react";
import { PopperTrigger, type PopperTriggerProps } from "../popper/popper-trigger";
import { useMenuHover } from "./menu-hover-context";

export const MenuTrigger = <T extends ElementType = "button">(props: Omit<PopperTriggerProps<T>, "active">) => {
  const { setHoverEnabled } = useMenuHover();

  return (
    <PopperTrigger
      active={true}
      {...props}
      onMouseEnter={() => {
        setHoverEnabled(true);
      }}
    />
  );
};
