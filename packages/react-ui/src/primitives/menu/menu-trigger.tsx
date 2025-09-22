import type { ComponentProps } from "react";
import type { JSX } from "react/jsx-runtime";
import { PopperTrigger } from "../popper/popper-trigger";
import { useMenuHover } from "./menu-hover-context";

export const MenuTrigger = (props: Omit<ComponentProps<typeof PopperTrigger>, "active">): JSX.Element => {
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
