import { FloatingPortal } from "@floating-ui/react";
import type { PropsWithChildren, RefObject } from "react";

export type PortalProps = {
  id?: string;
  root?: HTMLElement | null | RefObject<HTMLElement | null>;
  preserveTabOrder?: boolean;
};

export const Portal = ({
  children,
  id = "resolid-portal",
  root = undefined,
  preserveTabOrder = true,
}: PropsWithChildren<PortalProps>) => {
  return (
    <FloatingPortal id={id} root={root} preserveTabOrder={preserveTabOrder}>
      {children}
    </FloatingPortal>
  );
};
