import type { PropsWithChildren } from "react";
import { usePopperTransition } from "../popper/popper-transtion-context";
import { Portal } from "../portal/portal";

export const DialogPortal = ({ children }: PropsWithChildren) => {
  const { mounted } = usePopperTransition();

  if (!mounted) {
    return null;
  }

  return <Portal>{children}</Portal>;
};
