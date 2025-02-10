import type { PropsWithChildren } from "react";
import { Portal } from "../portal/portal";
import { usePopperTransition } from "./popper-transtion-context";

export const PopperPortal = ({ children }: PropsWithChildren) => {
  const { mounted } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  return <Portal>{children}</Portal>;
};
