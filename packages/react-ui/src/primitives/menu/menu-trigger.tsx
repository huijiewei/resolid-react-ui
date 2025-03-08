import type { ComponentProps } from "react";
import { PopperTrigger } from "../popper/popper-trigger";
import { useMenuHover } from "./menu-hover-context";

export const MenuTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">) => {
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
