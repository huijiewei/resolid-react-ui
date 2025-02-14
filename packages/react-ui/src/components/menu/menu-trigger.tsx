import type { ComponentProps } from "react";
import type { PopoverTrigger } from "../popover/popover";
import { PopperTrigger } from "../popper/popper-trigger";
import { useMenuHover } from "./menu-hover-context";

export const MenuTrigger = (props: Omit<ComponentProps<typeof PopoverTrigger>, "active">) => {
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
